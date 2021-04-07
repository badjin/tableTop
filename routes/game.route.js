const router = require('express').Router()

const { requireSignin } = require('../middlewares/auth')
const { 
  getGames, addGame
} = require('../controllers/game')

router.get('/games/:id', requireSignin, getGames)
router.post('/games/add', requireSignin, addGame)

module.exports = router