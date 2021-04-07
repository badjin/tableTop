const path = require('path')
// const Database = path.join(__dirname, `../models/User.${process.env.DATABASE}`)
// const User = require(Database)
const Game = require('../models/User')

exports.getGames = async (req, res, next) => {
  const games = await Game.findById(req.params.id)
  res.status(200).json({
    success: true,
    games: games.gameList
  })
}

exports.addGame = async (req, res, next) => {
  const {id, name, rank, year_published, average_user_rating, images} = req.body.game

  await Game.updateOne({_id:req.body.id}, {$push: { gameList: {
    gameId:id, name, rank, year_published, average_user_rating, images
  }} })

  const games = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    games: games.gameList
  })
}