import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchDeleteList, fetchAddToList } from "../../redux/lists"
import { useModal } from "../../context/Modal";
import "./ListTile.css"
import deleteIcon from '../../../icons/Remove_light@2x.png'

function ListTile ({ list, listId, itemId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUrl = window.location.pathname
    const currentListsPage = currentUrl === "/lists/current"
    // console.log(currentUrl)

    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        closeModal()
        await dispatch(fetchDeleteList(listId)).then(navigate('/'))
    }
    const addToList = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        closeModal()
        await dispatch(fetchAddToList(listId, itemId)).then(navigate(`/lists/${listId}`))
    }
    const handleEditList = async (e) => {
        e.stopPropagation()
        e.stopPropagation()
        navigate(`/lists/${listId}/update`)
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
                    <div className="update-list-button" onClick={handleEditList}> Edit List Details</div>
                    <img alt='delete' src={deleteIcon} onClick={handleDelete} className="delete-list-button"></img>
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
