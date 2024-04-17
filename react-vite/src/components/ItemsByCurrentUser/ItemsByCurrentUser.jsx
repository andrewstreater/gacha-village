import { fetchGetItemsByCurrentUser } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ItemTileDisplay from "../ItemTileDisplay"
import "./ItemsByCurrentUser.css"

function ItemsByCurrentUser () {
    const currentUserItems = useSelector(state => state.items.currentUserItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetItemsByCurrentUser())
    }, [dispatch])

    const allItemArray = Object.values(currentUserItems)

    return (
        <>
        <h1>Current User&apos;s Items page</h1>
        <ItemTileDisplay items={allItemArray} />
        </>
    )
}

export default ItemsByCurrentUser
