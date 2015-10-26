'use strict'

module.exports = function (context) {
  if (context.data.root.politicians[0].committees[context.data.index].role === 'Parti') {
    return 'parties'
  } else {
    return 'committees'
  }
}
