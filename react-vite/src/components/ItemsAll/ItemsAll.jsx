import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./ItemsAll.css"

function ItemsAll () {
    const allItems = useSelector(state => state.items.allItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetItems())
    }, [dispatch])

    return (
        <>
        <h1>All Items</h1>
        </>
    )
}

export default ItemsAll
