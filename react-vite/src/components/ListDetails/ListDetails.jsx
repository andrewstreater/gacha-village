import { fetchGetListDetails } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ListDetails.css"

function ListDetails() {
    const listDetails = useSelector(state => state.lists.listDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listId } = useParams()

    useEffect(() => {
        dispatch(fetchGetListDetails(listId))
    }, [dispatch, listId])

    return (
        <>
        <h1>List Details page</h1>
        </>
    )
}

export default ListDetails
