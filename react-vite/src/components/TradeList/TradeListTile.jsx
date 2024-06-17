// import { fetchGetItems } from "../../redux/items"
// import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { useEffect } from "react";
import "./TradeListTile.css"

function TradeListTile ({trade, allItems, currentUserId}) {

    const navigate = useNavigate()

    // console.log('From TradeListTile:', trade)

    if (allItems[trade.buyerItemId].ownerId == currentUserId) {
        return (
            <div className="trade-list-tile" onClick={() => navigate(`/trades/${trade.tradeId}`)}>
                <div> Trade# {trade.tradeId}</div>
                <div className="status-tile">
                    <div className="status-dot"></div>
                    <div className={trade.status}>{trade.status}</div>
                </div>
                <div className="row-two trade-tile-text" >You offered: </div>
                <img className="item-image-icon row-two" src={allItems[trade.buyerItemId].previewImage.imageUrl}></img>
                <div className="row-two trade-tile-text">for</div>
                <img className="item-image-icon row-two" src={allItems[trade.sellerItemId].previewImage.imageUrl}></img>
            </div>
        )
    }
    if (allItems[trade.sellerItemId].ownerId == currentUserId) {
        return (
            <div className="trade-list-tile" onClick={() => navigate(`/trades/${trade.tradeId}`)}>
                <div> Trade# {trade.tradeId}</div>
                <div className="status-tile">
                    <div className="status-dot"></div>
                    <div className={trade.status}>{trade.status}</div>
                </div>
                <div className="row-two trade-tile-text" >You were offered: </div>
                <img className="item-image-icon row-two" src={allItems[trade.buyerItemId].previewImage.imageUrl}></img>
                <div className="row-two trade-tile-text">for</div>
                <img className="item-image-icon row-two" src={allItems[trade.sellerItemId].previewImage.imageUrl}></img>
            </div>
        )
    }

}

export default TradeListTile
