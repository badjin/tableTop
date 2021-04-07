const router = require('express').Router()

const { requireSignin } = require('../middlewares/auth')
const { 
  getGames, addGame, deleteGame
} = require('../controllers/game')

router.get('/games/:id', requireSignin, getGames)
router.post('/games/add', requireSignin, addGame)
router.post('/games/delete', requireSignin, deleteGame)

module.exports = router