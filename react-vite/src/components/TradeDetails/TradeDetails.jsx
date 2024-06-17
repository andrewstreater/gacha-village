import { fetchGetTradeDetails } from "../../redux/trades"
import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./TradeDetails.css"

function TradeDetails() {
    const tradeDetails = useSelector(state => state.trades.tradeDetails);
    const sessionUser = useSelector((store) => store.session.user);
    const allItems = useSelector(state => state.items.allItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { tradeId } = useParams()
    let userMadeOffer

    useEffect(() => {
        dispatch(fetchGetItems())
        dispatch(fetchGetTradeDetails(tradeId))
    }, [dispatch, tradeId])

    // if (allItems[tradeDetails.Buyer.id].ownerId == sessionUser.id){
    //     userMadeOffer = true
    // }
    // if (allItems[tradeDetails.Seller.id].ownerId == sessionUser.id) {
    //     userMadeOffer = false
    // }

    console.log('TRADE DETAILS userMadeOffer: ', userMadeOffer)

    return (
        <>
        <h1>Trade Details</h1>
        <div>{tradeDetails.Buyer.username}</div>
        <div>{tradeDetails.Buyer.username}</div>
        <div>{tradeDetails.Buyer.Item.title}</div>
        <div>{tradeDetails.Seller.username}</div>
        <div>{tradeDetails.Seller.Item.title}</div>
        </>
    )
}

export default TradeDetails
