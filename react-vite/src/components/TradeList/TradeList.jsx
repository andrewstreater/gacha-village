// import ListTile from "./ListTile"
import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import "./TradeList.css"

function TradeList ({trades}) {
    const allItems = useSelector(state => state.items.allItems);
    const dispatch = useDispatch()

    const allItemArray = Object.values(allItems)

    useEffect(() => {
        dispatch(fetchGetItems())
    }, [dispatch])


    console.log('From TradeList:', trades.currentUserTrades)
    // let allTrades = {}
    // if (trades.currentUserTrades.length) {
    //     trades.currentUserTrades.map(trade => {
    //     })
    // }

    return (
        <div className="">
            <h2>Trades offers received</h2>
            {!trades.currentUserTrades ? (<>
                <p>You haven&apos;t received any trade offers yet</p>
            </>) : (<>
                {trades.currentUserTrades.map(trade => {
                    return(<p>{trade.tradeId}</p>)
                })}
            </>)}
        </div>
    )
}

export default TradeList
