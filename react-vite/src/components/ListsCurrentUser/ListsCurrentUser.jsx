import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import ListsDisplay from '../ListsDisplay'
import "./ListsCurrentUser.css"

function ListsCurrentUser () {
    const lists = useSelector(state => state.lists.currentUserLists);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    const listArray = Object.values(lists)

    return (
        <>
        <div className="flex-center-child">
            <div className="list-current-user-page">
                <h1>My Lists</h1>
                <ListsDisplay lists={listArray}/>
            </div>
        </div>
        </>
    )
}

export default ListsCurrentUser
