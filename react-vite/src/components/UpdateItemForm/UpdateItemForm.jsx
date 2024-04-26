import { fetchUpdateItem, fetchGetItemDetails } from "../../redux/items";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import "./UpdateItemForm.css"

function UpdateItemForm () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const { itemId } = useParams()
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

  useEffect(() => {

    dispatch(fetchGetItemDetails(itemId)).then(item => {
        // console.log('--------LINE 28: ', item.release_date)
        setTitle(item.title)
        setBrand(item.brand)
        setSeries(item.series)
        setModel(item.model)
        let itemYear = item.release_date.slice(12, 16)
        let itemDay = item.release_date.slice(5, 7)
        let itemMonth = ''
        if (item.release_date.slice(8, 11) == "Jan") {
            itemMonth = '01'
        }
        if (item.release_date.slice(8, 11) == "Feb") {
            itemMonth = '02'
        }
        if (item.release_date.slice(8, 11) == "Mar") {
            itemMonth = '03'
        }
        if (item.release_date.slice(8, 11) == "Apr") {
            itemMonth = '04'
        }
        if (item.release_date.slice(8, 11) == "May") {
            itemMonth = '05'
        }
        if (item.release_date.slice(8, 11) == "Jun") {
            itemMonth = '06'
        }
        if (item.release_date.slice(8, 11) == "Jul") {
            itemMonth = '07'
        }
        if (item.release_date.slice(8, 11) == "Aug") {
            itemMonth = '08'
        }
        if (item.release_date.slice(8, 11) == "Sep") {
            itemMonth = '09'
        }
        if (item.release_date.slice(8, 11) == "Oct") {
            itemMonth = '10'
        }
        if (item.release_date.slice(8, 11) == "Nov") {
            itemMonth = '11'
        }
        if (item.release_date.slice(8, 11) == "Dec") {
            itemMonth = '12'
        }
        console.log(itemMonth+'/'+itemDay+'/'+itemYear)
        setReleaseDate(itemMonth+'/'+itemDay+'/'+itemYear)
        setEdition(item.edition)
        setCondition(item.condition)
        setDescription(item.description)
        setIsTradable(item.is_tradable)
    })

  }, [dispatch, itemId])



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
    formData.append("is_tradable", isTradable)

    const serverResponse = await dispatch(
        fetchUpdateItem(formData, itemId)
    )
    if (serverResponse) {
      return
    } else {
      navigate('/items/current')
    }
  }

  if (!sessionUser) return <Navigate to="/" replace={true} />

  return (
    <>
      <div>
        <div id='update-item-main'></div>
          <div className='create-item-form-card'>
            <h1 id='create-item-title'>Update your item.</h1>
            <form id='item-form' onSubmit={handleSubmit} encType='multipart/form-data'>

              {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

              {/* Title */}
              <label style={{ background: 'none' }} htmlFor='createItemTitle'>Title</label>
              {hasSubmitted && errors.title && <p className="error">{errors.title}</p>}
              <input
                  type='text'
                  name='createItemTitle'
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />

              {/* Brand */}
              <label style={{ background: 'none' }} htmlFor='createItemBrand'>Brand</label>
              {hasSubmitted && errors.brand && <p className="error">{errors.brand}</p>}
              <input
                  type='text'
                  name='createItemBrand'
                  placeholder='Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
              />

              {/* Series */}
              <label style={{ background: 'none' }} htmlFor='createItemSeries'>Series</label>
              <input
                  type='text'
                  name='createItemSeries'
                  placeholder='Series'
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
              />

              {/* Model */}
              <label style={{ background: 'none' }} htmlFor='createItemModel'>Model</label>
              <input type='text'
              name='createItemModel'
              placeholder='Name'
              value={model}
              onChange={(e) => setModel(e.target.value)} />

              {/* Release Date */}
              <label style={{ background: 'none' }} htmlFor='createReleaseDate'>Release Date</label>
              {hasSubmitted && errors.releaseDate && <p className="error">{errors.releaseDate}</p>}
              <div>Existing Release Date: {releaseDate}</div>
              <input
                  type='date'
                  id='createReleaseDate'
                  name='createReleaseDate'
                  placeholder='Release Date'
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
              />

              {/* Edition */}

              <label style={{ background: 'none' }} htmlFor='createItemEdition'>Edition</label>
              <select
                  id='createItemEdition'
                  name='createItemEdition'
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
              >
                  <option value='Standard'>Standard</option>
                  <option value='Special'>Special</option>
                  <option value='Limited'>Limited</option>
              </select>

              {/* Condition */}
              <label style={{ background: 'none' }} htmlFor='createItemCondition'>Condition</label>
              {hasSubmitted && errors.condition && <p className="error">{errors.condition}</p>}
              <select
              id='createItemCondition'
              name='createItemCondition'
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              >
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
              {hasSubmitted && errors.description && <p className="error">{errors.description}</p>}
              <input
                  type='textarea'
                  name='createItemDescription'
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />

              {/* isTradable? */}
              <label style={{ background: 'none' }} htmlFor='createItemTradable'>Check the box to post this item for trade</label>
              <input
              type='checkbox'
              id='createItemTradable'
              name='createItemTradable'
              checked={isTradable}
              onChange={(e) => setIsTradable(e.target.checked)}
              />


              <button id='updateItemSubmit' type='submit'>Update Item</button>
            </form>
        </div>
      </div>
    </>
  )

}

export default UpdateItemForm
