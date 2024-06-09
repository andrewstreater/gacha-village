import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import "./TradeListTile.css"

function TradeListTile ({trade, allItems, currentUserId}) {

    console.log('From TradeListTile:', trade)

    if (allItems[trade.buyerItemId].ownerId == currentUserId) {
        return (
            <div className="trade-list-tile">
                <div> Trade# {trade.tradeId}</div>
                <div className={trade.status}>{trade.status}</div>
                <div className="row-two trade-tile-text" >You offered: </div>
                <img className="item-image-icon row-two" src={allItems[trade.buyerItemId].previewImage.imageUrl}></img>
                <div className="row-two trade-tile-text">for</div>
                <img className="item-image-icon row-two" src={allItems[trade.sellerItemId].previewImage.imageUrl}></img>
            </div>
        )
    }
    if (allItems[trade.sellerItemId].ownerId == currentUserId) {
        return (
            <>
            <h2>You got an offer on trade {trade.tradeId}</h2>
            </>
        )
    }

}

export default TradeListTile
