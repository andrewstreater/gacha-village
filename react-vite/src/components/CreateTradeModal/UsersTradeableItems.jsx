
// import {fetchCreateTrade} from "../../redux/trades.js";
import "./UsersTradeableItems.css";
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";

function UsersTradeableItems ({items, itemId}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((store) => store.session.user);

    const submitTrade = async (buyerItemId, sellerItemId) => {
        
        const response = await fetch(`/api/trades/new`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "buyerItemId": buyerItemId, 
                "sellerItemId": sellerItemId})
        });

        if (response.ok) {
            navigate('/trades/current')
        }
    }

    return (
        items.map(item => {
            return(
                <div key={item.itemId} className="user-tradeable-item-tile"
                onClick={() => submitTrade(item.itemId, itemId)}>
                    {item.title}
                </div>
            )
        })
    )
}

export default UsersTradeableItems
