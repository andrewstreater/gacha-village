const GET_CURRENT_USERS_LISTS = 'items/getCurrentUsersLists'
const GET_LIST_DETAILS = 'items/getListDetails'

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

const listsReducer = (state = {currentUserLists: {}, byId: {}}, action) => {
  switch (action.type) {
    case GET_CURRENT_USERS_LISTS:
        const ids = action.currentUserLists.byId
        delete action.currentUserLists.byId
        return { ...state, currentUserLists: action.currentUserLists, byId: ids }
    case GET_LIST_DETAILS:
        return { ...state, listDetails: action.listDetails }
    default:
      return state
  }
}

export default listsReducer
