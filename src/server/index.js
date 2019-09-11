var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack.config.js');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

var app = express();

app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/fonts/:file', function(req, res) {
  res.sendFile(`${__dirname}/fonts/${req.params.file}`)
})

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

var server = new WebpackDevServer(webpack(config), {
    contentBase: '/static',
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",

    stats: { colors: true }
});

server.listen(8081, "localhost", function() {});
app.listen(8080);