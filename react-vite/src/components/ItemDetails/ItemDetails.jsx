import { fetchGetItemDetails } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ItemDetails.css"

function ItemDetails () {
    const item = useSelector(state => state.items.itemDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { itemId } = useParams()

    useEffect(() => {
        dispatch(fetchGetItemDetails(itemId))
    }, [dispatch])

    return (
        <>
        <h1>Items Details</h1>
        </>
    )
}

export default ItemDetails
