// import { fetchGetItems } from "../../redux/items"
// import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { useEffect } from "react";
import "./TradeListTile.css"

function TradeListTile ({trade, allItems, currentUserId}) {

    const navigate = useNavigate()

    console.log('From TradeListTile:', trade)

    const buyerItem = allItems[trade.buyerItemId];
    const sellerItem = allItems[trade.sellerItemId];

    if (!buyerItem || !sellerItem) {
        console.error('Error: Missing item details for trade:', trade);
        return null;
    }


    return (
        <div className="trade-list-tile-grid-container" onClick={() => navigate(`/trades/${trade.tradeId}`)}>
            <div className="trade-id-number first-row"> Trade ID #: {trade.tradeId}</div>
            <div className="first-row-fill first-row"></div>
            <div className="status-tile first-row">
                <div className={`status-dot ${trade.status}`}></div>
                <div>
                    {trade && trade.status == 'open' ? (<>
                        <div>open</div>
                    </>) : trade.status == 'pending' ? (<>
                        <div>pending</div>
                    </>) : trade.status == 'accepted' ? (<>
                        <div>accepted</div>
                    </>) : trade.status == 'closed-rejected' ? (<>
                        <div>rejected</div>
                    </>) : trade.status == 'closed-accepted' ? (<>
                            <div>completed</div>
                        </>)
                        : <div>no status</div>}
                </div>
            </div>
            <div className="trade-tile-text">
                {buyerItem.ownerId == currentUserId ? (<>
                    You offered
                </>) : (<>
                    You were offered
                </>)}
            </div>
            <img className="item-image-icon1" src={allItems[trade.buyerItemId].previewImage.imageUrl}></img>
            <div className="for">for</div>
            <img className="item-image-icon2 row-two" src={allItems[trade.sellerItemId].previewImage.imageUrl}></img>
        </div>
    )
}

export default TradeListTile
