import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import "./ManageItemImages.css"

function ManageItemImages () {
  const sessionUser = useSelector((state) => state.session.user)
  const navigate = useNavigate()
  const [itemImages, setItemImages] = useState(['','','','','','','',''])

  // const [imageError, setImageError] = useState('')
  const { itemId } = useParams()

  if (!sessionUser) return <Navigate to="/" replace={true} />

  const createItemImage = async (itemId, itemImage) => {
    const response = await fetch(`/api/items/${itemId}/images/new`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(itemImage)
      });

    if (response.ok) {
        const newItemImage = await response.json();
        return newItemImage
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    itemImages.map((image, i) => {
      if (!image) return
      let itemImage = {}
      if (i === 0) {
        // const itemImage = new FormData()
        // itemImage.append("imageable_id", itemId)
        // itemImage.append("imageable_type", "item")
        // itemImage.append("image_url", image)
        // itemImage.append("preview", true)
        // createItemImage(itemId, itemImage)
        itemImage = {
          imageable_id: itemId,
          imageable_type: "item",
          image_url: image,
          preview: true
        }
      } else {
        // const itemImage = new FormData()
        // itemImage.append("imageable_id", itemId)
        // itemImage.append("imageable_type", "item")
        // itemImage.append("image_url", image)
        // itemImage.append("preview", true)
        // createItemImage(itemId, itemImage)

        itemImage = {
          imageable_id: itemId,
          imageable_type: "item",
          image_url: image,
          preview: false
        }
      }
      createItemImage(itemId, itemImage)
    })

    // const serverResponse = await dispatch(
    //     fetchCreateList(formData)
    // )
    // if (serverResponse) {
    //   setErrors(serverResponse)
    // } else {
    navigate(`/items/${itemId}`)
    // }
  }

  return (
    <>
      <div id='create-list-main'>
        <div className='create-list-form-card'>
          <h1 id='create-list-title'>Manage Item Images</h1>
          <form id='list-form' onSubmit={handleSubmit} encType='multipart/form-data'>

            <div>
              {itemImages.map((spot, i) => {
                if (i === 0) {
                  return (
                    <label key={i}>
                      <input
                        type="text"
                        placeholder="Preview Image URL"
                        className='text-input'
                        value={itemImages[i]}
                        onChange={(e) => {
                          const updatedItemImages = [...itemImages];
                          updatedItemImages[i] = e.target.value
                          setItemImages(updatedItemImages)
                        }}
                      />
                      <div className='spacer-15px'>
                        {/* {imageError && <div className='error'>{imageError}</div>} */}
                      </div>
                    </label>
                  )
                } else {
                  return (
                    <label key={i}>
                      <input
                        type="text"
                        placeholder="Image URL"
                        className='text-input'
                        value={itemImages[i]}
                        onChange={(e) => {
                          const updatedItemImages = [...itemImages];
                          updatedItemImages[i] = e.target.value
                          setItemImages(updatedItemImages)
                        }}
                      />
                    </label>
                  )
                }
              })}
            </div>
            <button id='createListSubmit' type='submit'>Add Images</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default ManageItemImages
