import { fetchGetItemsByCurrentUser } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import ItemTileDisplay from "../ItemTileDisplay"
import "./ItemsByCurrentUser.css"

function ItemsByCurrentUser () {
    const currentUserItems = useSelector(state => state.items.currentUserItems);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetItemsByCurrentUser())
    }, [dispatch])

    const allItemArray = Object.values(currentUserItems)

    return (
        <>
        <div className="flex-center-child">
            <div className="items-current-user-page">
                <h1>My Items</h1>
                <ItemTileDisplay items={allItemArray} />
            </div>
        </div>
        </>
    )
}

export default ItemsByCurrentUser
