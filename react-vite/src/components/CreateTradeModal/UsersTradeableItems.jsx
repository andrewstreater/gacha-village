import "./UsersTradeableItems.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UsersTradeableItems ({items, itemId}) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

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
        } else {
            response.json().then(data => {
                console.log(data)
                setErrors(data['error'])
            })
        }
    }

    return (
        items.map(item => {
            return(
                <>
                {item.is_tradable ? (
                    <div key={item.itemId} className="user-tradeable-item-tile"
                    onClick={() => submitTrade(item.itemId, itemId)}>
                        {item.title}
                    </div>
                ) : (<></>)}
                </>
            )
        })
    )
}

export default UsersTradeableItems
