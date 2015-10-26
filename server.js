'use strict'

var Path = require('path')
var Hapi = require('hapi')
var Hoek = require('hoek')

var server = new Hapi.Server()
var config = require('./config')
var politicianService = require('./index')

server.connection({
  port: config.SERVER_PORT
})

server.register(require('vision'), function (err) {

  Hoek.assert(!err, err)

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: true,
    compileMode: 'sync'
  })
})

server.register([
  {
    register: politicianService,
    options: {}
  }
], function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})



function startServer () {
  server.start(function () {
    console.log('Server running at:', server.info.uri)
  })
}

function stopServer () {
  server.stop(function () {
    console.log('Server stopped')
  })
}

module.exports.start = startServer

module.exports.stop = stopServer
