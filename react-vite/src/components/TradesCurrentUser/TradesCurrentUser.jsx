import { fetchGetCurrentUsersTrades } from "../../redux/trades"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import TradeList from "../TradeList"
// import { useNavigate, useParams } from "react-router-dom"
import "./TradesCurrentUser.css"

function TradesCurrentUser () {
    const trades = useSelector(state => state.trades);
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersTrades())
    }, [dispatch])

    return (
        <>
        <h1>Current User&apos;s Trades</h1>
        {!trades ? (<>
            <h2>No trades found</h2>
        </>) : (<>
            <TradeList trades={trades}/>
        </>)}
        </>
    )
}

export default TradesCurrentUser
