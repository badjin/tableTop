export { 
  loginUser, 
  logoutUser,
  updateLoginUser,
  updateProfile,
  registerUser,
  activationUser
} from './user/actions'

export { 
  getBgImagesFromUnsplash,
  setCurrentBgImage
} from './bgImage/actions'

export {
  getUsers,
  getSettings,
  updateSettings,
  deleteUser,
  updateUser,
  clearUsersData
} from './admin/actions'

export {
  getGames,
  getMyList,
  getGameDetail,
  setGame,
  addGame2MyList,
  removeGame,
  resetMyList,
  setMyList,
  getPlayLogs,
  addPlayLog,
  removeLog,
  setPlayLogs
} from './boardGames/actions'