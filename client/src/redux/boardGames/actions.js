import axios from 'axios'
import {
  GET_BGAMES_SUCCESS,
  GET_BGAMES_FAILURE,
  GET_MYLIST_SUCCESS,
  GET_MYLIST_FAILURE,
  GET_BGAME_DETAIL_SUCCESS,
  GET_BGAME_DETAIL_FAILURE
} from './types'


export const getGames = (parameter, keyword) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios(`https://api.boardgameatlas.com/api/search?${parameter}=${keyword}&limit=60&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
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
      axios(`https://api.boardgameatlas.com/api/search?ids=${keyword}&limit=60&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
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

export const getMyList = (token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/games`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_MYLIST_SUCCESS,
          payload: res.data
        })
        resolve(res.data)
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