'use strict'

var Wreck = require('wreck')
var config = require('../config')
var wreckOptions = {
  json: true
}

function getPoliticians (request, reply) {
  var skipNum = request.query.skip ? parseInt(request.query.skip, 10) : 0
  var limitNum = request.query.limit ? parseInt(request.query.limit, 10) : 20
  Wreck.get(config.API_URL + '/politicians?skip=' + skipNum + '&limit=' + limitNum, wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function searchPoliticians (request, reply) {
  Wreck.get(config.API_URL + '/politicians/search/request.params.searchText', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getPolitician (request, reply) {
  var pID = parseInt(request.params.politicianID, 10)
  Wreck.get(config.API_URL + '/politicians/' + pID, wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getParties (request, reply) {
  Wreck.get(config.API_URL + '/parties', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getParty (request, reply) {
  var pID = parseInt(request.params.partyID, 10)
  Wreck.get(config.API_URL + '/parties/' + pID, wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getPartyMembers (request, reply) {
  var pID = parseInt(request.params.partyID, 10)
  Wreck.get(config.API_URL + '/parties/' + pID + '/members', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getCommittees (request, reply) {
  Wreck.get(config.API_URL + '/committees', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getCommittee (request, reply) {
  var cID = parseInt(request.params.committeeID, 10)
  Wreck.get(config.API_URL + '/committees/' + cID, wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

function getCommitteeMembers (request, reply) {
  var cID = parseInt(request.params.committeeID, 10)
  Wreck.get(config.API_URL + '/committees/' + cID + '/members', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

module.exports.getPoliticians = getPoliticians

module.exports.searchPoliticians = searchPoliticians

module.exports.getPolitician = getPolitician

module.exports.getParties = getParties

module.exports.getParty = getParty

module.exports.getPartyMembers = getPartyMembers

module.exports.getCommittees = getCommittees

module.exports.getCommittee = getCommittee

module.exports.getCommitteeMembers = getCommitteeMembers
