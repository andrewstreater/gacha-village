// import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import ItemTile from "./ItemTile"
import "./ItemTileDisplay.css"

function ItemTileDisplay ({items, listId, listOwnerId }) {

    return (
        <div className="flex-center-child">
            <div className="all-item-tiles-container">
                {items.map(item => (
                    <ItemTile item={item} itemId={item.itemId} key={item.itemId} listId={listId} listOwnerId={listOwnerId}/>
                ))}
            </div>
        </div>
    )
}

export default ItemTileDisplay
