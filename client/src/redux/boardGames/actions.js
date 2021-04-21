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
  SET_MYLIST,
  GET_PLAYLOG_SUCCESS,
  GET_PLAYLOG_FAILURE,
  ADD_PLAYLOG_SUCCESS,
  ADD_PLAYLOG_FAILURE,
  REMOVE_PLAYLOG_SUCCESS,
  REMOVE_PLAYLOG_FAILURE,
  SET_PLAYLOG
} from './types'

import { getLoginInfo } from '../../helpers/auth'

// export const getGames = () => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {      
//       axios(`https://api.boardgameatlas.com/api/search?limit=96&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
//       .then( res => {
//         dispatch({
//           type:GET_BGAMES_SUCCESS,
//           payload:res.data.games
//         })
//         resolve(res.data.games)
//       })
//       .catch(error => {
//         dispatch({
//           type: GET_BGAMES_FAILURE
//         })
//         reject(error)
//       })
//     })      
//   }
// }

export const getGames = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/bgg/hot50`)
      .then( res => {
        dispatch({
          type:GET_BGAMES_SUCCESS,
          payload:res.data.gameList
        })
        resolve(res.data.gameList)
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

// export const getGameDetail = (keyword) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       axios(`https://api.boardgameatlas.com/api/search?ids=${keyword}&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
//       .then( res => {
//         dispatch({
//           type:GET_BGAME_DETAIL_SUCCESS,
//           payload:res.data.games[0]
//         })
//         resolve(res.data.games[0])
//       })
//       .catch(error => {
//         dispatch({
//           type: GET_BGAME_DETAIL_FAILURE
//         })
//         reject(error)
//       })
//     })      
//   }
// }

export const getGameDetail = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/bgg/game`, {id})
      .then( res => {
        dispatch({
          type:GET_BGAME_DETAIL_SUCCESS,
          payload:res.data.gameDetail
        })
        resolve(res.data.gameDetail)
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
      console.log(id)
      axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_MYLIST_SUCCESS,
          payload: res.data
        })        
        resolve(res.data.gameList)
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

export const addGame2MyList = (game) => {
  const { id, token } = getLoginInfo()
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
          payload: res.data.gameList
        })        
        resolve(res.data.gameList)
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

export const removeGame = (gameId) => {
  const { id, token } = getLoginInfo()
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
          payload: res.data.gamelist
        })        
        resolve(res.data.gameList)
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

export const setPlayLogs = (playLogs) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_PLAYLOG,
        payload:playLogs
      })
      resolve(true)
    })
  }  
}

export const getPlayLogs = () => {
  const { id, token } = getLoginInfo()
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/games/logs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_PLAYLOG_SUCCESS,
          payload: res.data.logs
        })        
        resolve(res.data.logs)
      })
      .catch(error => {
        dispatch({
          type: GET_PLAYLOG_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const addPlayLog = (log, isEdit) => {
  const { id, token } = getLoginInfo()
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/games/logs/${isEdit ? 'update' : 'add'}`, {id, log}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: ADD_PLAYLOG_SUCCESS,
          payload: res.data
        })        
        resolve(res.data.logs)
      })
      .catch(error => {
        dispatch({
          type: ADD_PLAYLOG_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const removeLog = ({logId, gameId}) => {
  const { id, token } = getLoginInfo()
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/games/logs/delete`, {id, logId, gameId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: REMOVE_PLAYLOG_SUCCESS,
          payload: res.data
        })        
        resolve(res.data.logs)
      })
      .catch(error => {
        dispatch({
          type: REMOVE_PLAYLOG_FAILURE
        })
        reject(error)
      })
    })      
  }
}