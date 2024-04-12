// import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
import ItemTile from "./ItemTile"
import "./ItemTileDisplay.css"

function ItemTileDisplay (props) {
    const items = props.items
    console.log("----------------------LINE 9: ",items)
    return (
        <div className="all-item-tiles-container">
            {items.map(item => (
                <ItemTile item={item} key={item.id}/>
            ))}
        </div>
    )
}

export default ItemTileDisplay
