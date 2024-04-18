import { fetchGetCurrentUsersLists } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import ListsDisplay from '../ListsDisplay'
import "./AddToList.css"

function AddToListModal () {
    const lists = useSelector(state => state.lists.currentUserLists);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersLists())
    }, [dispatch])

    const listArray = Object.values(lists)

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    };

    // console.log("--------------LINE 18: ", listArray)
    return (
        <>
        <h1>Current User&apos;s Lists</h1>
        <ListsDisplay lists={listArray}/>
        </>
    )
}

export default AddToListModal
