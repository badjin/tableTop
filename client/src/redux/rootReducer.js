import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import bgImageReducer from './bgImage/reducer'
import adminReducer from './admin/reducer'
import boardGamesReducer from './boardGames/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  bgImage: bgImageReducer,
  admin: adminReducer,
  boardGames: boardGamesReducer
})

export default rootReducer