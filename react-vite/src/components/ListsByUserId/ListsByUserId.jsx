import { fetchGetListByUserId } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ListsByUserId.css"

function ListsByUserId () {
    const lists = useSelector(state => state.lists.currentUserLists);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchGetListByUserId(userId))
    }, [dispatch])

    return (
        <>
        <h1>Lists by userId</h1>
        </>
    )
}

export default ListsByUserId
