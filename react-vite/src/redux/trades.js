const GET_CURRENT_USERS_TRADES = 'trades/getCurrentUsersTrades'
const GET_TRADE_DETAILS = 'trades/getTradeDetails'
// const CREATE_TRADE = 'trades/createTrade'
const UPDATE_TRADE = 'trades/updateTrade'
const DELETE_TRADE = 'trades/deleteTrade'

const getCurrentUsersTrades = (currentUserTrades) => {
    return {
      type: GET_CURRENT_USERS_TRADES,
      currentUserTrades
    }
  }

const getTradeDetails = (tradeDetails) => {
    return{
        type: GET_TRADE_DETAILS,
        tradeDetails
    }
}

// const createTrade = (newTrade) => {
//   return {
//     type: CREATE_TRADE,
//     newTrade
//   }
// }

const updateTrade = (updatedTrade) => {
    return {
        type: UPDATE_TRADE,
        updatedTrade
    }
}

const deleteTrade = (trade) => {
    return {
        type: DELETE_TRADE,
        trade
    }
}

export const fetchGetCurrentUsersTrades = () => async (dispatch) => {
    const res = await fetch("/api/trades/current")
    if (res.ok) {
      const data = await res.json()
      dispatch(getCurrentUsersTrades(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

export const fetchGetTradeDetails = (tradeId) => async (dispatch) => {
    const res = await fetch(`/api/trades/${tradeId}`)
    if (res.ok) {
      const data = await res.json()
      dispatch(getTradeDetails(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

// export const fetchCreateTrade = (payload) => async (dispatch) => {
//   const res = await fetch(`/api/trades/new`, {
//     method: 'POST',
//     body: payload
//   })
//
//   if (res.ok) {
//     const data = await res.json()
//     dispatch(createTrade(data))
//     return data
//   } else if (res.status < 500) {
//     const errorMessages = await res.json()
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// }

export const fetchUpdateTrade = (payload, tradeId) => async (dispatch) => {
    const res = await fetch(`/api/trades/${tradeId}/update`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const { resPost } = await res.json()
        dispatch(updateTrade(resPost))
        return resPost
    } else if (res.status < 500) {
        const errorMessages = await res.json()
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const fetchDeleteTrade = (tradeId) => async (dispatch) => {
    const res = await fetch(`/api/trades/${tradeId}/delete`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteTrade(tradeId))
        return res
    } else if (res.status < 500) {
        const errorMessages = await res.json()
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const tradesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USERS_TRADES:
        return { ...state, currentUserTrades: action.currentUserTrades}
    case GET_TRADE_DETAILS:
        return { ...state, tradeDetails: action.tradeDetails }
    case UPDATE_TRADE:
        return { ...state, tradeDetails: action.updatedTrade}
    default:
      return state
  }
}

export default tradesReducer
