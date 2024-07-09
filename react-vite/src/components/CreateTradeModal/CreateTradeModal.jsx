import { fetchGetItemsByCurrentUser } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import UsersTradeableItems from "./UsersTradeableItems"
import "./CreateTradeModal.css"

function CreateTradeModal ({ itemId, itemOwnerId }) {
    const currentUserItems = useSelector(state => state.items.currentUserItems);
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetItemsByCurrentUser())
    }, [dispatch])

    const itemArray = Object.values(currentUserItems)
    
    if (itemOwnerId == sessionUser.id) {
        return(
            <div>You cannot trade with yourself</div>
        )
    }

    return (
        <>
        <div id='add-to-list-modal'>
          <h1>Select an item to trade:</h1>
          <UsersTradeableItems items={itemArray} itemId={itemId}/>
        </div>
        </>
    )
}

export default CreateTradeModal
