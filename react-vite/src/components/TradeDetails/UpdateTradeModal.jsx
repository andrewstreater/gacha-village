import { fetchUpdateTrade } from "../../redux/trades.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import "./UpdateTradeModal.css"

function UpdateTradeModal ({ tradeId, action }) {
    const dispatch = useDispatch()

    const handleAccept = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        let payload = {}
        
        if (action === 'accept') {
            payload = {
                status: "accepted"
            }
        }

        if (action === 'reject') {
            payload = {
                status: "rejected"
            }
        }
        
        const serverResponse = await dispatch(
            fetchUpdateTrade(payload, tradeId)
        )

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            navigate('/trades/current')
        }
    }

    const rejectTrade = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return alert("You rejected the trade")
    }
    

    return (
        <>
            <div id='add-to-list-modal'>
                <h1>{`Are you sure you want to ${action} trade?`}</h1>
                <button onClick={handleAccept}>Yes</button>
                <button>No</button>
            </div>
        </>
    )
}

export default UpdateTradeModal