import { fetchGetItems } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./AllItems.css"

function AllItems () {
    const allItems = useSelector(state => state.items.allItems);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGetItems())
    }, [dispatch])

    return (
        <>
        <h1 className="all_items_tiles_tray">All Items</h1>
        {/* <div id='allAlbumTiles'>
            {allItems && allItems.albums.map((album, i) => {
                return (
                    <div key={i} className="albumTile" onClick={() => navigate(`/albums/${album.albumId}`)}>
                        <img src={`${album.imageUrl}`} className="album-image"></img>
                        <div className="albumTileAlbumName">{album.name}</div>
                        <div className="albumTileArtistName">{album.artistName}</div>
                    </div>
                )
            })}
        </div> */}
        </>
    )
}

export default AllItems
