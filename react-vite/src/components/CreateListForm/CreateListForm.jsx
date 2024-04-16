import { fetchCreateList } from "../../redux/lists";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import "./CreateListForm.css"

function CreateListForm () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState('')
  const [errors, setErrors] = useState({})

  if (!sessionUser) return <Navigate to="/" replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("private", isPrivate)

    const serverResponse = await dispatch(
        fetchCreateList(formData)
    )
    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <div>
        <div className='create-list-form-card'>
          <h1 id='create-list-title'>Create a new List</h1>
          <form id='list-form' onSubmit={handleSubmit} encType='multipart/form-data'>

            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

            {/* Title */}
            <label style={{ background: 'none' }} htmlFor='createListName'>Name</label>
            <input type='text' name='createListName' required placeholder='Name' onChange={(e) => setName(e.target.value)} />

            {/* Private */}
            <label style={{ background: 'none' }} htmlFor='listIsPrivate'>Check the box to set this list to private</label>
            <input
            type='checkbox'
            id='listIsPrivate'
            name='listIsPrivate'
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            />


            <button id='createListSubmit' type='submit'>Create List</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default CreateListForm
