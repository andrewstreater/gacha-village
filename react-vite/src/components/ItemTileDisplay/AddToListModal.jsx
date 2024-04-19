import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import ListsDisplay from '../ListsDisplay'
import "./AddToList.css"

function AddToListModal ({ itemId }) {
    const lists = useSelector(state => state.lists.currentUserLists);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    const listArray = Object.values(lists)

    const { closeModal } = useModal();


    // console.log("--------------LINE 18: ", listArray)
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
