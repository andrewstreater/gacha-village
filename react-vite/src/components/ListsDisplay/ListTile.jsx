import { useNavigate } from "react-router-dom"
import "./ListsDisplay.css"

function ListTile ({list}) {


    return (
        <>
            <div className="list-tile">
            {/* <img className='list-tile-image'src={imageUrl}></img> */}
            <p>{list.name}</p>
            </div>
        </>
    )
}

export default ListTile
