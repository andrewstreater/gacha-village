import { fetchGetListDetails } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ListDetails.css"
import ItemTileDisplay from "../ItemTileDisplay"

function ListDetails() {
    const listDetails = useSelector(state => state.lists.listDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listId } = useParams()

    useEffect(() => {
        dispatch(fetchGetListDetails(listId))
    }, [dispatch, listId])

    let items = []

    if (listDetails) {
        items = listDetails.List.Items
    }

    return (
        <>
        <h1>List Details page</h1>
        {listDetails && listDetails.List.name ? <h2>{listDetails.List.name}</h2> : <></>}
        <ItemTileDisplay items={items}/>
        </>
    )
}

export default ListDetails
