import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchDeleteList, fetchAddToList } from "../../redux/lists"
import { useModal } from "../../context/Modal";
import "./ListTile.css"
import { useEffect } from "react"

function ListTile ({ list, listId, itemId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUrl = window.location.pathname
    const currentListsPage = currentUrl === "/lists/current"
    // console.log(currentUrl)

    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        closeModal()
        await dispatch(fetchDeleteList(listId)).then(navigate('/'))
    }
    const addToList = async (e) => {
        e.preventDefault()
        closeModal()
        await dispatch(fetchAddToList(listId, itemId)).then(navigate(`/lists/${listId}`))
    }

    return (
        <>
            <div className="list-tile" onClick={() => navigate(`/lists/${listId}`)}>
            {/* <img className='list-tile-image'src={imageUrl}></img> */}
            <div className="list-tile-title">{list.name}</div>
            {/* {listImages.map(image => {
                return (
                    <img src={image}></img>
                )
            })} */}
            {currentListsPage ? (
                <>
                <div className="update-delete-list-buttons">
                <button className="update-list-button" onClick={() => navigate(`/lists/${listId}/update`)}> Edit List Details</button>
                <button className="delete-list-button" onClick={handleDelete}> Delete List</button>
                </div>
                </>
            ): (
                <>
                <button onClick={addToList}>add to list</button>
                </>
            )}
            </div>
        </>
    )
}

export default ListTile
