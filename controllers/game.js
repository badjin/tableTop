const { read } = require('fs')
const path = require('path')
// const Database = path.join(__dirname, `../models/User.${process.env.DATABASE}`)
// const User = require(Database)
const Game = require('../models/User')

exports.getGames = async (req, res, next) => {
  const user = await Game.findById(req.params.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}

exports.addGame = async (req, res, next) => {
  const {id, name, rank, year_published, average_user_rating, images} = req.body.game

  await Game.updateOne({_id:req.body.id}, {$push: { gameList: {
    gameId:id, name, rank, year_published, average_user_rating, images
  }} })

  const user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}

exports.resetLogCount = async (req, res, next) => {  
  let user = await Game.findById(req.body.id)
  const game = user.gameList.find((v, i) => v.gameId === req.body.gameId)

  if (game) {
    const count = 0
    await Game.updateOne(
      {_id:req.body.id, 'gameList.gameId':req.body.gameId}, 
      {$set: { 'gameList.$.logCount': count}}
    )
  }

  user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}

exports.deleteGame = async (req, res, next) => {
  await Game.updateOne({_id:req.body.id}, {$pull: { gameList: {gameId: req.body.gameId}} })

  const user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gamelist: user.gameList
  })
}

exports.getLogs = async (req, res, next) => {
  const user = await Game.findById(req.params.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gamelist: user.gameList
  })
}

exports.addLog = async (req, res, next) => {
  const {gameId, comment, playDate, players, playTime, winner} = req.body.log
  let user = await Game.findById(req.body.id)
  const game = user.gameList.find((v, i) => v.gameId === gameId)

  await Game.updateOne({_id:req.body.id}, {$push: { playLog: {
    gameId, comment, playDate, players, playTime, winner
  }} })
  
  if (game) {
    const count = game.logCount ? game.logCount : 0
    await Game.updateOne(
      {_id:req.body.id, 'gameList.gameId':gameId}, 
      {$set: { 'gameList.$.logCount': count+1}}
    )
  }

  user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}

exports.deleteLog = async (req, res, next) => {
  const { id, gameId, logId } = req.body
  let user = await Game.findById(req.body.id)
  const game = user.gameList.find((v, i) => v.gameId === gameId)

  await Game.updateOne({_id: id}, {$pull: { playLog: {_id: logId}} })
  
  if (game) {
    const count = game.logCount ? game.logCount : 1
    await Game.updateOne(
      {_id:req.body.id, 'gameList.gameId':gameId}, 
      {$set: { 'gameList.$.logCount': count-1}}
    )
  }

  user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}

exports.updateLog = async (req, res, next) => {
  const {_id, comment, playDate, players, playTime, winner} = req.body.log

  await Game.updateOne(
    {_id:req.body.id, 'playLog._id':_id}, 
    {$set:{'playLog.$.comment': comment,
            'playLog.$.playDate': playDate,
            'playLog.$.players': players,
            'playLog.$.playTime': playTime,
            'playLog.$.winner': winner
          }
    }
  )

  const user = await Game.findById(req.body.id)
  res.status(200).json({
    success: true,
    logs: user.playLog,
    gameList: user.gameList
  })
}