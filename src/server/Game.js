const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const answerSchema = new mongoose.Schema({
  title: 'string'
})

const categorySchema = new mongoose.Schema({
  title: 'string',
  answers: [answerSchema]
})


const gameSchema = new mongoose.Schema({
  title: 'string',
  categories: [categorySchema]
})

module.exports = mongoose.model('Game', gameSchema)