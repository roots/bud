/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as build from './build'
import clean from './clean'
import makeCommand from './Command'
import * as lint from './lint'
import * as make from './make'
import * as profile from './profile'
import * as site from './site'
import * as test from './test'

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
        lint.prettier(Base),
        site.build(Base),
        site.readme(Base),
        site.start(Base),
      ],
    }
  },
}

module.exports = plugin
