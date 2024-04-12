import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ListsCurrentUser.css"

function ListsCurrentUser () {
    const lists = useSelector(state => state.lists.currentUserLists);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    return (
        <>
        <h1>Current User's Lists</h1>
        </>
    )
}

export default ListsCurrentUser
