const GET_CURRENT_USERS_LISTS = 'lists/getCurrentUsersLists'
const GET_LIST_DETAILS = 'lists/getListDetails'
const GET_LISTS_BY_USER_ID = 'lists/getListByUserId'
const CREATE_LIST = 'lists/createList'
const UPDATE_LIST = 'lists/updateList'
const DELETE_LIST = 'lists/deleteList'

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

const createList = (newList) => {
  return{
    type: CREATE_LIST,
    newList
  }
}

const updateList = (updatedList) => {
  return {
    type: UPDATE_LIST,
    updatedList
  }
}

const deleteList = (list) => {
  return {
    type: DELETE_LIST,
    list
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

export const fetchCreateList = (payload) => async (dispatch) => {
  const res = await fetch(`/api/lists/new`, {
    method: 'POST',
    body: payload
  })

  if (res.ok) {
    const { resPost } = await res.json()
    dispatch(createList(resPost))
    return resPost
  } else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchUpdateList = (payload, listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}/update`, {
    method: 'PUT',
    body: payload
  })

  if (res.ok) {
    const { resPost } = await res.json()
    dispatch(updateList(resPost))
    return resPost
  } else if (res.status < 500) {
    const errorMessages = await res.json()
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const fetchDeleteList = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}/delete`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteList())
    return res
  } else if (res.status < 500) {
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
