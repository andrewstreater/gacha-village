import { fetchCreateItem } from '../../redux/items';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import rightArrow from '../../../icons/Arrow_right@2x.png'
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
  const [isTradable, setIsTradable] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const error = {}
    if (!title) {
      error.title = "Title is required"
    }
    if (!brand) {
      error.brand = "Brand is required"
    }
    if (!description) {
      error.description = "Description is required"
    }
    if (!condition) {
      error.condition = "Condition is required"
    }
    if (!releaseDate) {
      error.releaseDate = "Release Date is required"
    }
    setErrors(error)
  }, [title, brand, description, condition, releaseDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
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
    }
    let fReleaseDate = (month + '/' + day + '/' + date.getFullYear());

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

    if (serverResponse.error) {

    } else {
      navigate(`/items/${serverResponse.item_id}/images`)
    }
  }

  if (!sessionUser) return <Navigate to="/" replace={true} />

  return (
    <>
      <div id='create-item-main'>
        <div id='create-item-form-card'>
          <h1 id='create-item-title'>Tell us about your item.</h1>
          <form id='item-form' onSubmit={handleSubmit} encType='multipart/form-data'>

            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

            {/* Title */}
            <label style={{ background: 'none' }} htmlFor='createItemTitle'>Title*</label>
            {hasSubmitted && errors.title && <p className="error">{errors.title}</p>}
            <input type='text' name='createItemTitle' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />

            {/* Brand */}
            <label style={{ background: 'none' }} htmlFor='createItemBrand'>Brand*</label>
            {hasSubmitted && errors.brand && <p className="error">{errors.brand}</p>}
            <input type='text' name='createItemBrand' placeholder='Brand' onChange={(e) => setBrand(e.target.value)} />

            {/* Series */}
            <label style={{ background: 'none' }} htmlFor='createItemSeries'>Series</label>
            <input type='text' name='createItemSeries' placeholder='Series' onChange={(e) => setSeries(e.target.value)} />

            {/* Model */}
            <label style={{ background: 'none' }} htmlFor='createItemModel'>Model</label>
            <input type='text' name='createItemModel' placeholder='Name' onChange={(e) => setModel(e.target.value)} />

            {/* Release Date */}
            <label style={{ background: 'none' }} htmlFor='createReleaseDate'>Release Date*</label>
            {hasSubmitted && errors.releaseDate && <p className="error">{errors.releaseDate}</p>}
            <input type='date' id='createReleaseDate' name='createReleaseDate' placeholder='Release Date' onChange={(e) => setReleaseDate(e.target.value)} />

            {/* Edition */}
            <label style={{ background: 'none' }} htmlFor='createItemEdition'>Edition</label>
            <select id='createItemEdition' name='createItemEdition' required value={edition} onChange={(e) => setEdition(e.target.value)}>
              <option value='Standard'>Standard</option>
              <option value='Special'>Special</option>
              <option value='Limited'>Limited</option>
            </select>

            {/* Condition */}
            <label style={{ background: 'none' }} htmlFor='createItemCondition'>Condition*</label>
            {hasSubmitted && errors.condition && <p className="error">{errors.condition}</p>}
            <select id='createItemCondition' name='createItemCondition' value={condition} onChange={(e) => setCondition(e.target.value)}>
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
            <label style={{ background: 'none' }} htmlFor='createItemDescription'>Description*</label>
            {hasSubmitted && errors.description && <p className="error">{errors.description}</p>}
            <input className='description-input' type='textarea' name='createItemDescription' onChange={(e) => setDescription(e.target.value)} />

            {/* isTradable? */}
            <div className='flex-row'>
            <label className='check-box-msg bold' style={{ background: 'none' }} htmlFor='createItemTradable'>Check the box to list this item for trade </label>
            <img className="right-arrow" src={rightArrow}></img>
            <input
            className='item-check-box'
            type='checkbox'
            id='createItemTradable'
            name='createItemTradable'
            checked={isTradable}
            onChange={(e) => setIsTradable(e.target.checked)}
            />
            </div>
            <div className='bold right-align'>*required</div>
            <button id='createItemSubmit' type='submit'>Post Item</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default CreateItemForm
