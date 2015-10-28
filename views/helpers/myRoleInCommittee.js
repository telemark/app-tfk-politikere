'use strict'

module.exports = function (context) {
  var committeeID = context.data.root.committees ? context.data.root.committees[0]._id : context.data.root.parties[0]._id
  var myCommittees = context.data.root.members[context.data.index].committees
  var myRole = ''
  myCommittees.forEach(function (committee) {
    if (committee.groupRecno === committeeID) {
      myRole = committee.roleDescription
    }
  })
  return myRole
}
