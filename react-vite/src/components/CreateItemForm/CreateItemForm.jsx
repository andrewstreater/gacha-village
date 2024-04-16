import { fetchCreateItem } from '../../redux/items';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import "./CreateItemForm.css"

function CreateItemForm () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('')
  const [series, setSeries] = useState('')
  const [model, setModel] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [edition, setEdition] = useState('Standard')
  const [condition, setCondition] = useState('New')
  const [description, setDescription] = useState('')
  const [isTradeable, setIsTradeable] = useState('')
  const [errors, setErrors] = useState({})

  if (!sessionUser) return <Navigate to="/" replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()
    let date = new Date(releaseDate)

    let month = ''
    if (date.getMonth() < 9) {
      month = '0' + (date.getMonth() + 1)
    } else {
      month = (date.getMonth() + 1)
    }

    let day = ''
    if (date.getDate() < 9) {
        day = '0' + (date.getDate() + 1)
    } else {
        day = (date.getMonth())
        console.log('------------LINE 39: ', day)
    }
    let fReleaseDate = (month + '/' + day + '/' + date.getFullYear());
    // let fReleaseDate = (date.getFullYear() + '-' + month + '-' + day);

    console.log('------------LINE 44: ', fReleaseDate)
    console.log('------------LINE 44: ', releaseDate)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("brand", brand)
    formData.append("series", series)
    formData.append("model", model)
    formData.append("release_date", fReleaseDate)
    formData.append("edition", edition)
    formData.append("condition", condition)
    formData.append("description", description)
    formData.append("description", description)

    const serverResponse = await dispatch(
        fetchCreateItem(formData)
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
        <div className='create-item-form-card'>
          <h1 id='create-item-title'>Tell us about your item.</h1>
          <form id='item-form' onSubmit={handleSubmit} encType='multipart/form-data'>

            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

            {/* Title */}
            <label style={{ background: 'none' }} htmlFor='createItemTitle'>Title</label>
            <input type='text' name='createItemTitle' required placeholder='Title' onChange={(e) => setTitle(e.target.value)} />

            {/* Brand */}
            <label style={{ background: 'none' }} htmlFor='createItemBrand'>Brand</label>
            <input type='text' name='createItemBrand' required placeholder='Brand' onChange={(e) => setBrand(e.target.value)} />

            {/* Series */}
            <label style={{ background: 'none' }} htmlFor='createItemSeries'>Series</label>
            <input type='text' name='createItemSeries' placeholder='Series' onChange={(e) => setSeries(e.target.value)} />

            {/* Model */}
            <label style={{ background: 'none' }} htmlFor='createItemModel'>Model</label>
            <input type='text' name='createItemModel' placeholder='Name' onChange={(e) => setModel(e.target.value)} />

            {/* Release Date */}
            <label style={{ background: 'none' }} htmlFor='createReleaseDate'>Release Date</label>
            <input type='date' id='createReleaseDate' name='createReleaseDate' required placeholder='Release Date' onChange={(e) => setReleaseDate(e.target.value)} />

            {/* Edition */}
            <label style={{ background: 'none' }} htmlFor='createItemEdition'>Edition</label>
            <select id='createItemEdition' name='createItemEdition' required value={edition} onChange={(e) => setEdition(e.target.value)}>
              <option value='Standard'>Standard</option>
              <option value='Special'>Special</option>
              <option value='Limited'>Limited</option>
            </select>

            {/* Condition */}
            <label style={{ background: 'none' }} htmlFor='createItemCondition'>Condition</label>
            <select id='createItemCondition' name='createItemCondition' required value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value='New'>New</option>
              <option value='Open Box'>Open Box</option>
              <option value='Like New'>Like New</option>
              <option value='Very Good'>Very Good</option>
              <option value='Good'>Good</option>
              <option value='Acceptable'>Acceptable</option>
              <option value='Repaired'>Repaired</option>
              <option value='For parts or not working'>For parts or not working</option>
            </select>

            {/* Description */}
            <label style={{ background: 'none' }} htmlFor='createItemDescription'>Description</label>
            <input type='textarea' name='createItemDescription' required placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

            {/* isTradeable? */}
            <label style={{ background: 'none' }} htmlFor='createItemTradeable'>Check the box to post this item for trade</label>
            <input
            type='checkbox'
            id='createItemTradeable'
            name='createItemTradeable'
            checked={isTradeable}
            onChange={(e) => setIsTradeable(e.target.checked)}
            />


            <button id='createItemSubmit' type='submit'>Post Item</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default CreateItemForm
