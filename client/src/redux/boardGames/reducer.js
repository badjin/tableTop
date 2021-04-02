import {
  GET_BGAMES_SUCCESS,
  GET_BGAMES_FAILURE,
  GET_MYLIST_SUCCESS,
  GET_MYLIST_FAILURE,
  GET_BGAME_DETAIL_SUCCESS,
  GET_BGAME_DETAIL_FAILURE
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

      default:
        return state;
  }
}

export default boardGamesReducer