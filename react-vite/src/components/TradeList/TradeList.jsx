// import ListTile from "./ListTile"
import TradeListTile from "./TradeListTile";
import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import "./TradeList.css"

function TradeList ({trades}) {
    const allItems = useSelector(state => state.items.allItems);
    const sessionUser = useSelector((store) => store.session.user);
    const dispatch = useDispatch()

    // const allItemArray = Object.values(allItems)

    useEffect(() => {
        dispatch(fetchGetItems())
    }, [dispatch])


    // console.log('From TradeList:', allItems)

    return (
        <div className="">
            <h2>Trades</h2>
            {!trades.currentUserTrades ? (<>
                <p>You haven&apos;t received any trade offers yet</p>
            </>) : (<>
                {trades && allItems && trades.currentUserTrades.map(trade => {
                    return(
                        <TradeListTile key={trade.tradeId} trade={trade} allItems={allItems} currentUserId={sessionUser.id}/>
                    )
                })}
            </>)}
        </div>
    )
}

export default TradeList
