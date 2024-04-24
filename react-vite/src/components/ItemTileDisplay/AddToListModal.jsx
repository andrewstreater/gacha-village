import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import ListsDisplay from '../ListsDisplay'
import "./AddToList.css"

function AddToListModal ({ itemId }) {
    const lists = useSelector(state => state.lists.currentUserLists);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    const listArray = Object.values(lists)

    return (
        <>
        <div id='add-to-list-modal'>
          <h1>Add item to list:</h1>
          <ListsDisplay lists={listArray} itemId={itemId}/>
        </div>
        </>
    )
}

export default AddToListModal
