require('dotenv').config()
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
let config = require('../../webpack.dev.js')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const proxy = require('proxy-middleware')
const url = require('url')

const Game = require('./Game')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.json())

app.use('/assets', proxy(url.parse(`http://${process.env.BASE_URL}:${process.env.PROXY_PORT}/assets`)))

app.get('/fonts/:file', function(req, res) {
  res.sendFile(`${__dirname}/fonts/${req.params.file}`)
})

app.get('/api/games', async (req, res) => {
  const games = await Game.find({}).limit(10)
  res.json({games})
})

app.post('/api/game', async (req, res) => {
  const game = req.body
  game.id = undefined
  game.categories.forEach(c => {
    c.id = undefined
    c.answers.forEach(a => {
      a.id = undefined
      a.categoryId = undefined
    })
  })
  const test = await Game.create(game)
  res.json(test)
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/static/index.html')
});

var server = new WebpackDevServer(webpack(config), {
    contentBase: '/static',
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",

    stats: { colors: true }
});

server.listen(process.env.PROXY_PORT, process.env.BASE_URL, function() {});
app.listen(process.env.APP_PORT);