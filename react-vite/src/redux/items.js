const GET_ITEMS = 'items/getItems'
const GET_ITEM_DETAILS = 'items/getItemDetails'

const getItems = (allItems) => {
    return {
      type: GET_ITEMS,
      allItems
    }
  }

const getItemDetails = (itemDetails) => {
    return{
        type: GET_ITEM_DETAILS,
        itemDetails
    }
}

export const fetchGetItems = () => async (dispatch) => {
    const res = await fetch("/api/items")
    if (res.ok) {
      const data = await res.json()
      dispatch(getItems(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

export const fetchGetItemDetails = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`)
    if (res.ok) {
      const data = await res.json()
      dispatch(getItemDetails(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

const itemsReducer = (state = {allItems: {}, byId: {}}, action) => {
  switch (action.type) {
    case GET_ITEMS:
        const ids = action.allItems.byId
        delete action.allItems.byId
        return { ...state, allItems: action.allItems, byId: ids }
    case GET_ITEM_DETAILS:
        return { ...state, itemDetails: action.itemDetails }
    default:
      return state
  }
}

export default itemsReducer
