/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import make from './make'
import clean from './clean'
import * as profile from './profile'
import * as site from './site'
import * as build from './build'
import * as lint from './lint'
import * as test from './test'

const plugin = {
  name: `plugin-bud`,
  factory: require => {
    const {Command} = require('clipanion')

    return {
      commands: [
        make(Command),
        clean(Command),
        test.all(Command),
        test.unit(Command),
        test.integration(Command),
        profile.all(Command),
        profile.cjs(Command),
        profile.esm(Command),
        build.all(Command),
        build.cjs(Command),
        build.esm(Command),
        lint.all(Command),
        lint.skypack(Command),
        lint.eslint(Command),
        site.build(Command),
        site.readme(Command),
        site.start(Command),
      ],
    }
  },
}

module.exports = plugin
