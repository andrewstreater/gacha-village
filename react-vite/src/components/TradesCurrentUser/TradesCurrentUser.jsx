import { fetchGetCurrentUsersTrades } from "../../redux/trades"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./TradesCurrentUser.css"

function TradesCurrentUser () {
    const trades = useSelector(state => state.trades.trades);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetCurrentUsersTrades())
    }, [dispatch])

    return (
        <>
        <h1>Current User's Trades</h1>
        </>
    )
}

export default TradesCurrentUser
