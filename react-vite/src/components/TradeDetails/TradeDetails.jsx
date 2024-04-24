import { fetchGetTradeDetails } from "../../redux/trades"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import "./TradeDetails.css"

function TradeDetails() {
    // const tradeDetails = useSelector(state => state.trades.tradeDetails);
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { tradeId } = useParams()

    useEffect(() => {
        dispatch(fetchGetTradeDetails(tradeId))
    }, [dispatch, tradeId])

    return (
        <>
        <h1>Trade Details page</h1>
        </>
    )
}

export default TradeDetails
