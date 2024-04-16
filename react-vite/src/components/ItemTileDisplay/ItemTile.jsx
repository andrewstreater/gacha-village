// import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
import "./ItemTile.css"

function ItemTile ({ item }) {
    // console.log("----------------------LINE 7: ", item)
    let imageUrl = "No Image"
    if (item.previewImage && item.previewImage.imageUrl) {
        imageUrl = item.previewImage.imageUrl
    }
    return (
        <>
            <div className="item-tile">
            <img className='item-tile-image'src={imageUrl}></img>
            <p>{item.title}</p>
            </div>
        </>
    )
}

export default ItemTile
