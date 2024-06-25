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
        // dispatch(fetchGetItems())
        dispatch(fetchGetTradeDetails(tradeId))
    }, [dispatch, tradeId])

    // console.log('TRADE DETAILS userMadeOffer: ', userMadeOffer)
    // console.log('TRADE DETAILS tradeDetails: ', tradeDetails)

    if (!tradeDetails) {
        return <div>Loading...</div>
    }

    const { Buyer, Seller, status } = tradeDetails;

    if (!Buyer || !Seller) {
        return <div>Error: Missing trade details</div>
    }

    console.log('TRADE DETAILS Buyer: ', Buyer)
    console.log('TRADE DETAILS Seller: ', Seller)

    return (
        <div id="trade-details-page">
        <h1>Trade Details</h1>
            <div className="trade-details-container">
                {/* Buyer Info */}
                <div>{tradeDetails && tradeDetails.Buyer.username}</div>
                <div> offered:</div>
                <div>{tradeDetails && tradeDetails.Buyer.Item.title}</div>
                <img src={Buyer.Item.previewImage[0].imageUrl} className="trade-details-item-image" alt={`${Buyer.Item.title} image`}></img>
        
                {/* Seller Info */}
                <div>{tradeDetails && tradeDetails.Seller.username}</div>
                <div>{tradeDetails && tradeDetails.Seller.Item.title}</div>
                <img src={Seller.Item.previewImage[0].imageUrl} className="trade-details-item-image" alt={`${Seller.Item.title} image`}></img>
        
                {tradeDetails && tradeDetails.status == 'open' ? (<>
                <div>open</div>
                </>) : tradeDetails && tradeDetails.status == 'pending' ? (<>
                <div>pending</div>
                </>) : tradeDetails && tradeDetails.status == 'accepted' ? (<>
                <div>accepted</div>
                </>) : tradeDetails && tradeDetails.status == 'closed-rejected' ? (<>
                <div>rejected</div>
                </>) : tradeDetails && tradeDetails.status == 'closed-accepted' ? (<>
                <div>completed</div>
                </>)
                : <div>no status</div>}
            </div>
        </div>
    )
}

export default TradeDetails
