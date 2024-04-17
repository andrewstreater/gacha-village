import { useNavigate } from "react-router-dom"
import ListTile from "./ListTile"
import "./ListsDisplay.css"

function ListsDisplay ({lists}) {

    const navigate = useNavigate()


    return (
        <div className="">
            {lists.map(list => (
                <ListTile list={list} listId={list.listId} key={list.listId}/>
            ))}
        </div>
    )
}

export default ListsDisplay
