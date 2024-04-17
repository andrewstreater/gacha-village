// import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./ItemTile.css"

function ItemTile ({ item, itemId }) {
    const navigate = useNavigate()
    let imageUrl = "No Image"
    if (item.previewImage && item.previewImage.imageUrl) {
        imageUrl = item.previewImage.imageUrl
    }
    console.log("---------------LINE 12", itemId)
    return (
        <>
            <div className="item-tile" onClick={() => navigate(`/items/${itemId}`)}>
            <img className='item-tile-image'src={imageUrl}></img>
            <p>{item.title}</p>
            </div>
        </>
    )
}

export default ItemTile
