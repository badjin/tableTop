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

const initialState = {
  games: [],
  game: '',
  myList: [],
  myGame: '',
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

      case GET_MYLIST_SUCCESS:      
        return { 
          ...state, 
          myList: action.payload,
          loading: false
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

      default:
        return state;
  }
}

export default boardGamesReducer