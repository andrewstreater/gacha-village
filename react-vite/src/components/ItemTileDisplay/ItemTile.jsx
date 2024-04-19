import { useDispatch } from "react-redux"
// import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { fetchDeleteItem } from "../../redux/items"
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import OpenModalButton from '../OpenModalButton'
import AddToListModal from "./AddToListModal"
import addIcon from '../../../icons/Add_square_light@2x.png'
import tradeIcon from '../../../icons/Transger_light@2x.png'
import editIcon from '../../../icons/Edit_light@2x.png'
import deleteIcon from '../../../icons/Remove_light@2x.png'
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
            <img className="item-tile-image"src={imageUrl} onClick={() => navigate(`/items/${itemId}`)}></img>
            {currentItemsPage ? (
                <>
                    <div className="item-tiles-details">
                        <div className="item-tile-title" onClick={() => navigate(`/items/${itemId}`)}>{item.title}</div>
                        <img className="item-tile-edit-button" src={editIcon} onClick={() => navigate(`/items/${itemId}/update`)}></img>
                        <img className="item-tile-delete-button" src={deleteIcon} onClick={handleDelete}></img>
                    </div>
                </>
            ): (
                <>
                    <div className="item-tiles-details">
                        <div className="item-tile-title" onClick={() => navigate(`/items/${itemId}`)}>{item.title}</div>
                        <img className="item-tile-trade-button" src={tradeIcon} alt="Trade" />
                        {/* <img className="item-tile-add-button" src={addIcon} alt="Add to list"></img> */}
                        <OpenModalButton
                        imgSrc={addIcon}
                        srcClass='item-tile-add-button'
                        modalComponent={<AddToListModal itemId={itemId}/>}
                        />
                    </div>
                </>
            )}
            </div>
        </>
    )
}

export default ItemTile
