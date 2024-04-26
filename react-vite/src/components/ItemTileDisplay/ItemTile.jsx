import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchDeleteItem } from "../../redux/items"
import { fetchRemoveFromList } from "../../redux/lists"
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import OpenModalButton from '../OpenModalButton'
import AddToListModal from "./AddToListModal"
import addIcon from '../../../icons/Add_square_light@2x.png'
import tradeIcon from '../../../icons/Transger_light@2x.png'
import editIcon from '../../../icons/Edit_light@2x.png'
import deleteIcon from '../../../icons/Remove_light@2x.png'
import "./ItemTile.css"

function ItemTile ({ item, itemId, listId, listOwnerId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector((store) => store.session.user);
    const currentUrl = window.location.pathname
    const currentItemsPage = currentUrl === "/items/current"
    const currentUserListPage = currentUrl.startsWith("/lists/") && (sessionUser.id === listOwnerId)

    // console.log("-------------item tile line 21: ", currentUserListPage)
    let imageUrl = "No Image"

    if (item.previewImage && item.previewImage.imageUrl.length) {
        imageUrl = item.previewImage.imageUrl
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(fetchDeleteItem(itemId)).then(navigate('/items'))
    }

    const removeFromList = async (e) => {
        e.preventDefault()
        await dispatch(fetchRemoveFromList(listId, itemId)).then(navigate('/items'))
    }

    const handleTrade = (e) => {
        e.preventDefault()
        alert('Trade feature coming soon!');
    };

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
            ) : currentUserListPage ? (
                <>
                    <div className="item-tiles-details">
                        <div className="item-tile-title" onClick={() => navigate(`/items/${itemId}`)}>{item.title}</div>
                        <img className="item-tile-trade-button" src={tradeIcon} alt="Trade" />
                        <img className="item-tile-delete-button" src={deleteIcon} onClick={removeFromList}></img>
                    </div>
                </>
            ) : (
                <>
                    <div className="item-tiles-details">
                        <div className="item-tile-title" onClick={() => navigate(`/items/${itemId}`)}>{item.title}</div>
                        <img className="item-tile-trade-button" onClick={handleTrade} src={tradeIcon} alt="Trade" />
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
