const router = require('express').Router()

const { requireSignin } = require('../middlewares/auth')
const { 
  getGames, addGame, deleteGame, getLogs, addLog, deleteLog, updateLog,  resetLogCount
} = require('../controllers/game')

router.get('/games/:id', requireSignin, getGames)
router.post('/games/add', requireSignin, addGame)
router.post('/games/delete', requireSignin, deleteGame)

router.get('/games/logs/:id', requireSignin, getLogs)
router.post('/games/logs/add', requireSignin, addLog)
router.post('/games/logs/delete', requireSignin, deleteLog)
router.post('/games/logs/update', requireSignin, updateLog)
router.post('/games/logs/resetlogcount', requireSignin, resetLogCount)

module.exports = router