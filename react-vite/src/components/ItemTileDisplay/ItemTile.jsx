import { useDispatch } from "react-redux"
// import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { fetchDeleteItem } from "../../redux/items"
import "./ItemTile.css"

function ItemTile ({ item, itemId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUrl = window.location.pathname
    const currentItemsPage = currentUrl === "/items/current"

    let imageUrl = "No Image"

    if (item.previewImage && item.previewImage.imageUrl) {
        imageUrl = item.previewImage.imageUrl
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(fetchDeleteItem(itemId)).then(navigate('/items'))
    }

    return (
        <>
            <div className="item-tile">
            <img className='item-tile-image'src={imageUrl} onClick={() => navigate(`/items/${itemId}`)}></img>
            <p>{item.title}</p>
            {currentItemsPage ? (
                <>
                <button onClick={() => navigate(`/items/${itemId}/update`)}> Edit Item</button>
                <button onClick={handleDelete}> Delete Item</button>
                </>
            ): (<></>)}
            </div>
        </>
    )
}

export default ItemTile
