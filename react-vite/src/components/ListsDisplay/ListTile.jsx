import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchDeleteList } from "../../redux/lists"
import "./ListTile.css"

function ListTile ({ list, listId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUrl = window.location.pathname
    const currentListsPage = currentUrl === "/lists/current"
    console.log(listId)

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(fetchDeleteList(listId)).then(navigate('/'))
    }

    return (
        <>
            <div className="list-tile">
            {/* <img className='list-tile-image'src={imageUrl}></img> */}
            <p>{list.name}</p>
            {currentListsPage ? (
                <>
                <button onClick={() => navigate(`/lists/${listId}/update`)}> Edit List Details</button>
                <button onClick={handleDelete}> Delete List</button>
                </>
            ): (<></>)}
            </div>
        </>
    )
}

export default ListTile
