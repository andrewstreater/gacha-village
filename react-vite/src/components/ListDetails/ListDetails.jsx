import { fetchGetListDetails } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ListDetails.css"
import ItemTileDisplay from "../ItemTileDisplay"

function ListDetails() {
    const listDetails = useSelector(state => state.lists.listDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listId } = useParams()

    useEffect(() => {
        dispatch(fetchGetListDetails(listId))
    }, [dispatch, listId])

    let items = []
    let listOwnerId = ''

    if (listDetails) {
        items = listDetails.List.Items
        listOwnerId = listDetails.List.userId
    }

    const emptyList = items.length === 0

    return (
        <>
        <div className="flex-center-child">
            <div className="list-detail-page">
                {listDetails && listDetails.List.name ? <h1>{listDetails.List.name}</h1> : <></>}
                <ItemTileDisplay items={items} listId={listId} listOwnerId={listOwnerId}/>
                {emptyList ? (<div>There are no items on this list.</div>):(<></>)}
            </div>
        </div>
        </>
    )
}

export default ListDetails
