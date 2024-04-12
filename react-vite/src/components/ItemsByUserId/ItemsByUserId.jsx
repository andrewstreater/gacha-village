import { fetchGetItemsByUserId } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ItemsByUserId.css"

function ItemsByUserId () {
    const userItems = useSelector(state => state.items.userItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchGetItemsByUserId(userId))
    }, [dispatch])

    return (
        <>
        <h1>Items by UserId page</h1>
        </>
    )
}

export default ItemsByUserId
