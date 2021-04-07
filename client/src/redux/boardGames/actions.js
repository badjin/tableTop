import axios from 'axios'
import {
  GET_BGAMES_SUCCESS,
  GET_BGAMES_FAILURE,
  GET_MYLIST_SUCCESS,
  GET_MYLIST_FAILURE,
  GET_BGAME_DETAIL_SUCCESS,
  GET_BGAME_DETAIL_FAILURE,
  SET_GAME,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
  REMOVE_GAME_SUCCESS,
  REMOVE_GAME_FAILURE,
  RESET_MYLIST,
  SET_MYLIST
} from './types'

import { getLoginInfo } from '../../helpers/auth'

export const getGames = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios(`https://api.boardgameatlas.com/api/search?order_by=popularity&limit=96&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
      .then( res => {
        dispatch({
          type:GET_BGAMES_SUCCESS,
          payload:res.data.games
        })
        resolve(res.data.games)
      })
      .catch(error => {
        dispatch({
          type: GET_BGAMES_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const getGameDetail = (keyword) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios(`https://api.boardgameatlas.com/api/search?ids=${keyword}&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
      .then( res => {
        dispatch({
          type:GET_BGAME_DETAIL_SUCCESS,
          payload:res.data.games[0]
        })
        resolve(res.data.games[0])
      })
      .catch(error => {
        dispatch({
          type: GET_BGAME_DETAIL_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const setGame = (game) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_GAME,
        payload:game
      })
      resolve(true)
    })
  }  
}

export const setMyList = (games) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_MYLIST,
        payload:games
      })
      resolve(true)
    })
  }  
}

export const getMyList = () => {
  const { id, token } = getLoginInfo()
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_MYLIST_SUCCESS,
          payload: res.data.games
        })        
        resolve(res.data.games)
      })
      .catch(error => {
        dispatch({
          type: GET_MYLIST_FAILURE
        })
        reject(error)
      })
    })      
  }
}

// export const getGames = (isPopular) => {
//   isPopular ? getGamesFromApi() : getMyList()
// }

export const addGame2MyList = (token, {id, game}) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/games/add`, {id, game}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: ADD_GAME_SUCCESS,
          payload: res.data.games
        })        
        resolve(res.data.games)
      })
      .catch(error => {
        dispatch({
          type: ADD_GAME_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const removeGame = (token, {id, gameId}) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/games/delete`, {id, gameId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: REMOVE_GAME_SUCCESS,
          payload: res.data.games
        })        
        resolve(res.data.games)
      })
      .catch(error => {
        dispatch({
          type: REMOVE_GAME_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const resetMyList = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_MYLIST
    })
  }  
}