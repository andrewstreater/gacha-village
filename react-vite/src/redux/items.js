const GET_ITEMS = 'items/getItems'
const GET_ITEM_DETAILS = 'items/getItemDetails'
const GET_ITEMS_BY_USER_ID = 'items/getItemsByUserId'
const GET_ITEMS_BY_CURRENT_USER = 'items/getItemsByCurrentUser'
const CREATE_ITEM = 'items/createItem'
const UPDATE_ITEM = 'items/updateItem'
const DELETE_ITEM = 'items/deleteItem'

const getItems = (allItems) => {
  return {
    type: GET_ITEMS,
    allItems
  }
}

const getItemDetails = (itemDetails) => {
  return {
      type: GET_ITEM_DETAILS,
      itemDetails
  }
}

const getItemsByUserId = (userItems) => {
  return {
    type: GET_ITEMS_BY_USER_ID,
    userItems
  }
}

const getItemsByCurrentUser = (currentUserItems) => {
  return {
    type: GET_ITEMS_BY_CURRENT_USER,
    currentUserItems
  }
}

const createItem = (newItem) => {
  return {
    type: CREATE_ITEM,
    newItem
  }
}

const updateItem = (updatedItem) => {
  return {
    type: UPDATE_ITEM,
    updatedItem
  }
}

const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item
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

export const fetchGetItemsByUserId = (userId) => async (dispatch) => {
  const res = await fetch(`/api/items/user/${userId}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getItemsByUserId(data))
    return data
  }  else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchGetItemsByCurrentUser = () => async (dispatch) => {
  const res = await fetch(`/api/items/current`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getItemsByCurrentUser(data))
    return data
  }  else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchCreateItem = (payload) => async (dispatch) => {
  const res = await fetch(`/api/items/new`, {
    method: 'POST',
    body: payload
  })

  if (res.ok) {
    const { resPost } = await res.json()
    dispatch(createItem(resPost))
    return resPost
  } else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchUpdateItem = (payload, itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'PUT',
    body: payload
  })

  if (res.ok) {
    const { resPost } = await res.json()
    dispatch(updateItem(resPost))
    return resPost
  } else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchDeleteItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteItem())
    return res
  } else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

const itemsReducer = (state = {allItems: {}, byId: {}, userItems: {}, currentUserItems: {}}, action) => {
  switch (action.type) {
    case GET_ITEMS:
      const ids = action.allItems.byId
      delete action.allItems.byId
      return { ...state, allItems: action.allItems, byId: ids }
    case GET_ITEM_DETAILS:
      return { ...state, itemDetails: action.itemDetails }
    case GET_ITEMS_BY_USER_ID:
      const userItemIds = action.userItems.byId
      delete action.userItems.byId
      return { ...state, userItems: action.userItems, byId: userItemIds }
    case GET_ITEMS_BY_CURRENT_USER:
      const currentUserItemIds = action.currentUserItems.byId
      delete action.currentUserItems.byId
      return { ...state, currentUserItems: action.currentUserItems, byId: currentUserItemIds }
    default:
      return state
  }
}

export default itemsReducer
