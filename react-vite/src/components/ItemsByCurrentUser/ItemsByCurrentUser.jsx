import { fetchGetItemsByCurrentUser } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ItemsByCurrentUser.css"

function ItemsByCurrentUser () {
    const currentUserItems = useSelector(state => state.items.currentUserItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetItemsByCurrentUser())
    }, [dispatch])

    return (
        <>
        <h1>Current User&apos;s Items page</h1>
        </>
    )
}

export default ItemsByCurrentUser
