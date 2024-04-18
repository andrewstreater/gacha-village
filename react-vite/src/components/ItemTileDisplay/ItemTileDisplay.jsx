// import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import ItemTile from "./ItemTile"
import "./ItemTileDisplay.css"

function ItemTileDisplay (props) {
    const items = props.items
    return (
        <div className="all-item-tiles-container">
            {items.map(item => (
                <ItemTile item={item} itemId={item.itemId} key={item.itemId}/>
            ))}
        </div>
    )
}

export default ItemTileDisplay
