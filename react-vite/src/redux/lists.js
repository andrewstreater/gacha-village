const GET_CURRENT_USERS_LISTS = 'lists/getCurrentUsersLists'
const GET_LIST_DETAILS = 'lists/getListDetails'
const GET_LISTS_BY_USER_ID = 'lists/getListByUserId'

const getCurrentUserslists = (currentUserLists) => {
  return {
    type: GET_CURRENT_USERS_LISTS,
    currentUserLists
  }
  }

const getListDetails = (listDetails) => {
  return{
      type: GET_LIST_DETAILS,
      listDetails
  }
}

const getListByUserId = (userLists) => {
  return{
    type: GET_LISTS_BY_USER_ID,
    userLists
  }
}

export const fetchGetCurrentUsersLists = () => async (dispatch) => {
  const res = await fetch("/api/lists/current")
  if (res.ok) {
    const data = await res.json()
    dispatch(getCurrentUserslists(data))
    return data
  }  else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchGetListDetails = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getListDetails(data))
    return data
  }  else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchGetListByUserId = (userId) => async (dispatch) => {
  const res = await fetch(`/api/lists/user/${userId}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getListByUserId(data))
    return data
  }  else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

const listsReducer = (state = {currentUserLists: {}, byId: {}, userLists: {}}, action) => {
  switch (action.type) {
    case GET_CURRENT_USERS_LISTS:
      const currentUserListIds = action.currentUserLists.byId
      delete action.currentUserLists.byId
      return { ...state, currentUserLists: action.currentUserLists, byId: currentUserListIds }
    case GET_LIST_DETAILS:
      return { ...state, listDetails: action.listDetails }
    case GET_LISTS_BY_USER_ID:
      const userListIds = action.userLists.byId
      delete action.userLists.byId
      return { ...state, userLists: action.userLists, byId: userListIds }
    default:
      return state
  }
}

export default listsReducer
