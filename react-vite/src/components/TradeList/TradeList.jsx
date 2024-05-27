// import ListTile from "./ListTile"
import "./TradeList.css"

function TradeList ({trades}) {

    console.log('From TradeList:', trades)
    const asSeller = trades.currentUserTrades.asSeller
    const asBuyer = trades.currentUserTrades.asBuyer
    console.log('From TradeList, asSeller:', asSeller)
    console.log('From TradeList, asBuyer:', asBuyer)

    return (
        <div className="">
            <h2>Trades offers received</h2>
            {!asSeller ? (<>
                <p>You haven&apos;t received any trade offers yet</p>
            </>) : (<>
                {asSeller.map(trade => {
                    <p>{trade.id}</p>
                })}
            </>)}
            <h2>Trades offers sent</h2>
            {!asBuyer ? (<>
                <p>You haven&apos;t made any trade offers yet</p>
            </>) : (<>
                {asBuyer.map(trade => {
                    <p>{trade.id}</p>
                })}
            </>)}
        </div>
    )
}

export default TradeList
