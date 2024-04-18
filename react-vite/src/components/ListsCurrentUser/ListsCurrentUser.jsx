import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ListsDisplay from '../ListsDisplay'
import "./ListsCurrentUser.css"

function ListsCurrentUser () {
    const lists = useSelector(state => state.lists.currentUserLists);
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    const listArray = Object.values(lists)

    return (
        <>
        <h1>My Lists</h1>
        <ListsDisplay lists={listArray}/>
        </>
    )
}

export default ListsCurrentUser
