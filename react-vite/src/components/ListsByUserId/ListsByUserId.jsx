import { fetchGetListByUserId } from "../../redux/lists"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListsDisplay from "../ListsDisplay"
import "./ListsByUserId.css"

function ListsByUserId () {
    const lists = useSelector(state => state.lists.userLists);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchGetListByUserId(userId))
    }, [dispatch])

    const listArray = Object.values(lists)


    return (
        <>
        <h1>Lists by userId</h1>
        <ListsDisplay lists={listArray}/>
        </>
    )
}

export default ListsByUserId
