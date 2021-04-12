const mongoose = require('mongoose')
const imageRoot = 'https://s3.amazonaws.xom/mybucket/'

const PlayLogSchema = new mongoose.Schema({
  comment: String,
  gameId: String,
  playDate: Date,
  players: String,
  playTime: { type: Number, min: 10, max: 360 },
  winner: String
  // playImages: [{type: String, get: v => `${imageRoot}${v}`}]
})

const GameSchema = new mongoose.Schema({
  gameId: String,
  name: String,
  rank: Number,
  logCount: {
    type: Number,
    default: 0
  },
  year_published: Number,
  average_user_rating: Number,
  images: Object
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a user name."]
  },
  email: {
    type: String,
    required: [true, "Please provide a email."],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email."
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    minlength: [8, "Password must be at least 8 characters long."],
    select: false // not send this when requested from client
  },
  role: {
    type: String,
    default: 'customer'
  },
  avatar: {
    type: String,
    default: 'default.png'
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  googleAccount:{
    type: Boolean,
    default: false
  },
  gameList: [GameSchema],
  playLog: [PlayLogSchema]
}, {timestamps: true})

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = mongoose.model('User', UserSchema)
