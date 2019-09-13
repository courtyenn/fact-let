require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Game = require('./Game')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.json())

app.get('/fonts/:file', function(req, res) {
  res.sendFile(`${__dirname}/fonts/${req.params.file}`)
})

app.get('/api/games', async (req, res) => {
  const games = await Game.find({}).limit(10)
  res.json({games})
})

app.post('/api/game', async (req, res) => {
  const test = await Game.create(req.body)
  res.json(test)
})

app.get('/assets/app.bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/assets/app.bundle.js`)
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/static/index.html')
});

app.listen(process.env.APP_PORT);