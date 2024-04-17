import { fetchUpdateList, fetchGetListDetails } from "../../redux/lists";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import "./UpdateListForm.css"

function UpdateListForm () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listId } = useParams()
  const sessionUser = useSelector((state) => state.session.user)
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState('')
  const [errors, setErrors] = useState({})

  if (!sessionUser) return <Navigate to="/" replace={true} />

  useEffect(() => {
    if (listId) {
        dispatch(fetchGetListDetails(listId)).then(list => {
            setName(list.List.name)
            setIsPrivate(list.List.private)
        })
    }
  }, [dispatch, listId])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("private", isPrivate)

    const serverResponse = await dispatch(
        fetchUpdateList(formData, listId)
    )
    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      navigate('/lists/current')
    }
  }

  return (
    <>
      <div>
        <div className='create-list-form-card'>
          <h1 id='create-list-title'>Update your list</h1>
          <form id='list-form' onSubmit={handleSubmit} encType='multipart/form-data'>

            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

            {/* Title */}
            <label style={{ background: 'none' }} htmlFor='createListName'>Name</label>
            <input
            type='text'
            name='createListName'
            required placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            {/* Private */}
            <label style={{ background: 'none' }} htmlFor='listIsPrivate'>Check the box to set this list to private</label>
            <input
            type='checkbox'
            id='listIsPrivate'
            name='listIsPrivate'
            value={isPrivate}
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            />


            <button id='createListSubmit' type='submit'>Update List</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default UpdateListForm
