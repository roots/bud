/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as make from './make'
import clean from './clean'
import * as profile from './profile'
import * as site from './site'
import * as build from './build'
import * as lint from './lint'
import * as test from './test'
import makeCommand from './Command'

const plugin = {
  name: `plugin-bud`,
  factory: require => {
    const Base = makeCommand(
      require('clipanion').Command,
      require('@yarnpkg/shell').execute,
    )

    return {
      commands: [
        clean(Base),
        make.dev(Base),
        make.ci(Base),
        test.all(Base),
        test.unit(Base),
        test.integration(Base),
        profile.all(Base),
        profile.cjs(Base),
        profile.esm(Base),
        build.all(Base),
        build.cjs(Base),
        build.esm(Base),
        lint.all(Base),
        lint.skypack(Base),
        lint.eslint(Base),
        site.build(Base),
        site.readme(Base),
        site.start(Base),
      ],
    }
  },
}

module.exports = plugin
