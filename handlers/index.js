'use strict'

const Wreck = require('wreck')
const config = require('../config')
var wreckOptions = {
  json: true
}

module.exports.getFrontpage = (request, reply) => {
  var viewOptions = {}
  var jobsToDo = 2
  var jobsDone = 0

  function allAboard () {
    jobsDone++
    if (jobsDone === jobsToDo) {
      reply.view('index', viewOptions)
    }
  }

  Wreck.get(config.API_URL + '/parties', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.parties = payload
    }
    allAboard()
  })

  Wreck.get(config.API_URL + '/committees', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.committees = payload
    }
    allAboard()
  })
}

module.exports.getPoliticians = (request, reply) => {
  var skipNum = request.query.skip ? parseInt(request.query.skip, 10) : 0
  var limitNum = request.query.limit ? parseInt(request.query.limit, 10) : 20
  Wreck.get(config.API_URL + '/politicians?skip=' + skipNum + '&limit=' + limitNum, wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

module.exports.searchPoliticians = (request, reply) => {
  var searchText = request.query.query
  if (searchText) {
    Wreck.get(config.API_URL + '/politicians/search/' + searchText, wreckOptions, function (error, res, payload) {
      if (error) {
        reply(error)
      } else {
        reply.view('search', {members: payload, query: searchText})
      }
    })
  } else {
    reply.view('search', {members: [], query: searchText})
  }
}

module.exports.getPolitician = (request, reply) => {
  var pID = parseInt(request.params.politicianID, 10)
  Wreck.get(config.API_URL + '/politicians/' + pID, wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      reply.view('politician', {politicians: payload})
    }
  })
}

module.exports.getParties = (request, reply) => {
  Wreck.get(config.API_URL + '/parties', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      reply.view('parties', {parties: payload})
    }
  })
}

module.exports.getParty = (request, reply) => {
  var pID = parseInt(request.params.partyID, 10)
  var viewOptions = {}
  var jobsToDo = 2
  var jobsDone = 0

  function allAboard () {
    jobsDone++
    if (jobsDone === jobsToDo) {
      reply.view('party', viewOptions)
    }
  }

  Wreck.get(config.API_URL + '/parties/' + pID, wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.parties = payload
    }
    allAboard()
  })

  Wreck.get(config.API_URL + '/parties/' + pID + '/members', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.members = payload
    }
    allAboard()
  })
}

module.exports.getPartyMembers = (request, reply) => {
  var pID = parseInt(request.params.partyID, 10)
  Wreck.get(config.API_URL + '/parties/' + pID + '/members', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

module.exports.getCommittees = (request, reply) => {
  Wreck.get(config.API_URL + '/committees', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      reply.view('committees', {committees: payload})
    }
  })
}

module.exports.getCommittee = (request, reply) => {
  var cID = parseInt(request.params.committeeID, 10)
  var viewOptions = {}
  var jobsToDo = 2
  var jobsDone = 0

  function allAboard () {
    jobsDone++
    if (jobsDone === jobsToDo) {
      reply.view('committee', viewOptions)
    }
  }

  Wreck.get(config.API_URL + '/committees/' + cID, wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.committees = payload
      allAboard()
    }
  })

  Wreck.get(config.API_URL + '/committees/' + cID + '/members', wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.members = payload
      allAboard()
    }
  })
}

module.exports.getCommitteeMembers = (request, reply) => {
  var cID = parseInt(request.params.committeeID, 10)
  Wreck.get(config.API_URL + '/committees/' + cID + '/members', wreckOptions, function (error, res, payload) {
    reply(error || payload)
  })
}

module.exports.getContactInformation = (request, reply) => {
  var contacts = require('../config/contacts.json')
  reply.view('kontakt', {contacts: contacts})
}
