'use strict'

function getMyParty (committees) {
  var party
  committees.forEach(function (committee) {
    if (committee.role === 'Parti') {
      party = committee
    }
  })
  return party
}

module.exports = function (context) {
  var myCommittees = context.data.root.members[context.data.index].committees
  var myParty = getMyParty(myCommittees)
  return myParty ? '<a href="/parties/' + myParty.groupRecno + '">' + myParty.name + '</a>' : ''
}
