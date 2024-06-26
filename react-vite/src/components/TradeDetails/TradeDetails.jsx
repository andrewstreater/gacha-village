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
    
    const acceptTrade = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return alert("You accepted the trade")
    }
    
    const rejectTrade = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return alert("You rejected the trade")
    }

    const cancelTrade = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return alert("You canceled the trade")
    }

    return (
        <div id="trade-details-page">
        <h1 className='trade-details-h1'>Trade Details</h1>
            <div className="trade-details-container">
                <div>Trade ID #: {tradeId}</div>
                {/* User's Item Info */}
                {Buyer.id == sessionUser.id ? (
                    <>
                        <div className='your-item-text'>Your item:</div>
                        <div className='user-item-title'>Title: {tradeDetails && tradeDetails.Buyer.Item.title}</div>
                        <img src={Buyer.Item.previewImage[0].imageUrl}
                             className="user-item-image trade-details-item-image"
                             alt={`${Buyer.Item.title} image`}></img>
                        <button className='cancel-button' onClick={cancelTrade}>Cancel</button>
                    </>
                ) : (
                    <>
                        <div className='your-item-text'>Your item:</div>
                        <div className='user-item-title'>Title: {tradeDetails && tradeDetails.Seller.Item.title}</div>
                        <img src={Seller.Item.previewImage[0].imageUrl}
                             className="user-item-image trade-details-item-image"
                             alt={`${Seller.Item.title} image`}></img>
                    </>
                )}

                {/* Contra Party Item Info */}
                {Seller.id == sessionUser.id ? (
                    <>
                        <div className='contra-party-user-name'>{tradeDetails && tradeDetails.Buyer.username}'s item:
                        </div>
                        <div
                            className='contra-party-item-name'>Title: {tradeDetails && tradeDetails.Buyer.Item.title}</div>
                        <img src={Buyer.Item.previewImage[0].imageUrl}
                             className="contra-party-item-image trade-details-item-image"
                             alt={`${Buyer.Item.title} image`}></img>
                    </>
                ) : (
                    <>
                        <div className='contra-party-user-name'>{tradeDetails && tradeDetails.Seller.username}'s item:
                        </div>
                        <div
                            className='contra-party-item-name'>Title: {tradeDetails && tradeDetails.Seller.Item.title}</div>
                        <img src={Seller.Item.previewImage[0].imageUrl}
                             className="contra-party-item-image trade-details-item-image"
                             alt={`${Seller.Item.title} image`}></img>
                    </>
                )}

                <div className='trade-details-status'> Status:
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
                <button className='accept-button' onClick={acceptTrade}>Accept</button>
                <button className='reject-button' onClick={rejectTrade}>Reject</button>
            </div>
        </div>
    )
}

export default TradeDetails
