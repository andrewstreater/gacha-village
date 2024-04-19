import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import ItemTileDisplay from "../ItemTileDisplay"
import "./ItemsAll.css"

function ItemsAll () {
    const allItems = useSelector(state => state.items.allItems);
    const dispatch = useDispatch()

    const allItemArray = Object.values(allItems)

    useEffect(() => {
        dispatch(fetchGetItems())
    }, [dispatch])

    return (
        <>
        <div className="all-items-page">
            <h1>All Items</h1>
            <ItemTileDisplay items={allItemArray} />
        </div>
        </>
    )
}

export default ItemsAll
