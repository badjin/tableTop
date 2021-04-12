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

const initialState = {
  games: [],
  game: '',
  myList: [],
  myGame: '',
  playLogs: [],
  playLog: '',
  errorMessage: '',
  loading: false
}

const boardGamesReducer = (state=initialState, action) => {
  switch(action.type){
      case GET_BGAMES_SUCCESS:      
        return { 
          ...state, 
          games: action.payload,
          loading: false
        }

      case GET_BGAMES_FAILURE:
        return { 
          ...state, 
          games: []
        }

      case RESET_MYLIST:
      case GET_MYLIST_FAILURE:
        return { 
          ...state, 
          myList: []
        }

      case GET_BGAME_DETAIL_SUCCESS:      
        return { 
          ...state, 
          game: action.payload,
          loading: false
        }

      case GET_BGAME_DETAIL_FAILURE:
        return { 
          ...state, 
          game: ''
        }

      case SET_GAME:
        return {
          ...state,
          game: action.payload
        }

      case SET_MYLIST:
      case ADD_GAME_SUCCESS:
      case REMOVE_GAME_SUCCESS:
        return {
          ...state,
          myList: action.payload
        }

      case ADD_GAME_FAILURE:
      case REMOVE_GAME_FAILURE:
        return {
          state
        }

      case SET_PLAYLOG:
      case GET_PLAYLOG_SUCCESS:      
        return { 
          ...state, 
          playLogs: action.payload
        }
      
      case GET_PLAYLOG_FAILURE:
        return { 
          ...state, 
          playLogs: []
        }

      case GET_MYLIST_SUCCESS:
      case ADD_PLAYLOG_SUCCESS:
      case REMOVE_PLAYLOG_SUCCESS:
        return {
          ...state,
          playLogs: action.payload.logs,
          myList: action.payload.gameList
        }

      case ADD_PLAYLOG_FAILURE:
      case REMOVE_PLAYLOG_FAILURE:
        return {
          state
        }

      default:
        return state;
  }
}

export default boardGamesReducer