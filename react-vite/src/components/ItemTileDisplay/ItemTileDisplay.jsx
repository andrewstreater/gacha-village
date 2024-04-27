import { useSelector } from "react-redux"
// import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import ItemTile from "./ItemTile"
import "./ItemTileDisplay.css"

function ItemTileDisplay ({items, listId, listOwnerId }) {
    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) return <Navigate to="/login" replace={true} />

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
