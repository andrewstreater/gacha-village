import { fetchGetItemDetails } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ItemDetails.css"

function ItemDetails () {
    const item = useSelector(state => state.items.itemDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { itemId } = useParams()

    useEffect(() => {
        dispatch(fetchGetItemDetails(itemId))
    }, [dispatch, itemId])


    let itemDetailEntries = []
    if (item) {
        itemDetailEntries = Object.entries(item)
    }

    return (
        <>
        <h1>{item && item.title}</h1>
        {/* Item Images */}
        {item && item.itemImages.map(image => {
            return (
                <img className='item-details-image' src={image.imageUrl} key={image.imageId}></img>
            )
        })}

        {/* Item Details */}
        {itemDetailEntries && itemDetailEntries.map(detail => {
            if (detail[0] == "itemImages" || detail[0] == "is_tradable") {
                return (<></>)
            }
            return (
                <>
                    <div key={detail[0]}>
                        <div className="item-detail-key">{detail[0]} :</div>
                        <div className="item-detail-value">{detail[1]}</div>
                    </div>
                </>
            )
        })}
        {item && item.is_tradable ? (
            <button onClick={() => navigate('/')}>Trade</button>
        ) : (
            <button></button>
        )}
        </>
    )
}

export default ItemDetails
