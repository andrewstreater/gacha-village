import { fetchGetItemDetails } from "../../redux/items"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ItemDetails.css"
import tradeIcon from "../../../icons/Transger_light@2x.png";
import CreateTradeModal from "../CreateTradeModal/index.js";
import OpenModalButton from "../OpenModalButton/index.js";
import addIcon from "../../../icons/Add_square_light@2x.png";
import AddToListModal from "../ItemTileDisplay/AddToListModal.jsx";

function ItemDetails () {
    const item = useSelector(state => state.items.itemDetails);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { itemId } = useParams()

    useEffect(() => {
        dispatch(fetchGetItemDetails(itemId))
    }, [dispatch, itemId])

    const handleTrade = (e) => {
        e.preventDefault()
        alert('Trade feature coming soon!');
    };

    let itemDetailEntries = []
    if (item) {
        itemDetailEntries = Object.entries(item)
    }

    return (
        <>
        <div className="flex-center-child">
            <div className="item-details-page">
                <h1 className="item-details-title">{item && item.title}</h1>
                {/* Item Images */}
                <div className="item-images-container">
                    {item && item.itemImages.map(image => {
                        return (
                            <img className='item-details-image' src={image.imageUrl} key={image.imageId}></img>
                        )
                    })}
                </div>

                {/* Item Details */}
                <div className="item-details-page-details">
                {itemDetailEntries && itemDetailEntries.map(detail => {
                    if (detail[0] == "itemImages"
                    || detail[0] == "is_tradable"
                    || detail[0] == "ownerId"
                    || detail[0] == "itemId"
                    || detail[0] == "title"
                    || detail[0] == "release_date"
                    ) {
                        return (<></>)
                    }
                    // if (detail[0] == "release_date") {
                    //     return (
                    //         <>
                    //         <div key={detail[0]}>
                    //             <div className="item-detail-key">release date :</div>
                    //             <div className="item-detail-value">{detail[1].slice(5, 16)}</div>
                    //         </div>
                    //         </>
                    //     )
                    // }
                    return (
                        <>
                            <div key={detail[0]}>
                                <div className="item-detail-key">{detail[0]} :</div>
                                <div className="item-detail-value">{detail[1]}</div>
                            </div>
                        </>
                    )
                })}
                    <div className='trade-and-add-to-list-buttons'>
                        <div className="item-details-trade-button">
                        {item && item.is_tradable ? (
                            // <button onClick={handleTrade}>Trade</button>
                            <OpenModalButton
                                imgSrc={tradeIcon}
                                srcClass="item-tile-trade-button"
                                modalComponent={<CreateTradeModal itemId={itemId}/>}/>
                        ) : (
                            <div className="padding-left-8">*this item is not available for trade</div>
                        )}
                        </div>
                            <OpenModalButton
                                imgSrc={addIcon}
                                srcClass='item-tile-add-button'
                                modalComponent={<AddToListModal itemId={itemId}/>}
                            />
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default ItemDetails
