const tsNode = require('ts-node')
tsNode.register({transpileOnly: true})
module.exports = require('./config').default
