const {join} = require('path')
const {paths} = require('@repo/constants')

const config = require(join(paths.config, 'ncc.config.js'))

module.exports = config
