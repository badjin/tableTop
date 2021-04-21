const axios = require('axios')
// const parseBggXmlApi2SearchResponse = require('@code-bucket/board-game-geek')

exports.getBggHot50 = async (req, res, next) => {
  const results = await axios('https://bgg-json.azurewebsites.net/hot')

  res.status(200).json({
    success: true,    
    gameList: results.data
  })
}

exports.getGameDetail = async (req, res, next) => {
  const results = await axios(`https://bgg-json.azurewebsites.net/thing/${req.body.id}`)

  res.status(200).json({
    success: true,    
    gameDetail: results.data
  })
}