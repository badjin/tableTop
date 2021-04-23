const router = require('express').Router()

const { 
  getBggHot50, getGameDetail
} = require('../controllers/bgg')

router.get('/bgg/hot50', getBggHot50)
router.post('/bgg/game', getGameDetail)

module.exports = router