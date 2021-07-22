'use strict'

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var dev = Command =>
  class extends Command {
    static paths = [[`kjo`, `make`]]
    static usage = {
      category: `kjo`,
      description: `build the kjo`,
    }

    async execute() {
      await this.$([`yarn kjo clean`])
      await this.$([`yarn install --immutable`])
      await this.$([`yarn kjo build`])
      await this.$([
        `yarn kjo test unit`,
        `yarn kjo test integration`,
        `yarn kjo lint skypack`,
      ])
      await this.$([`yarn install`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var ci = Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `ci`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo (CI)`,
    }

    async execute() {
      await this.$([`yarn install --immutable`])
      await this.$([`yarn kjo build cjs`])
      await this.$([`yarn kjo test`])
      await this.$([`yarn kjo site`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var clean = Command =>
  class extends Command {
    static paths = [[`kjo`, `clean`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `rm -rf **/.budfiles`,
        `rm -rf **/node_modules`,
        `rm -rf examples/*/dist`,
        `rm -rf examples/sage/public/*`,
        `rm -rf examples/sage/storage/bud/*`,
        `rm -rf packages/*/*/lib`,
        `rm -rf packages/*/*/types`,
      ])

      await this.$([`yarn cache clean`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$3 = Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn kjo profile cjs`,
        `yarn kjo profile esm`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var cjs$1 = Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`, `cjs`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:cjs`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var esm$1 = Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`, `esm`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:esm`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var build = Command =>
  class extends Command {
    static paths = [[`kjo`, `site`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn ts-node ./dev/site`,
        `yarn kjo site readme`,
      ])
      await this.$([`yarn docusaurus build`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var readme = Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `readme`]]

    static usage = {
      category: `kjo`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn kjo site readme`]],
    }

    async execute() {
      await this.$([`yarn ts-node ./dev/readme`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var start = Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `start`]]

    static usage = {
      category: `kjo`,
      description: `site start`,
      examples: [[`Build site`, `yarn kjo site start`]],
    }

    async execute() {
      await this.$([`yarn ts-node ./dev/site`])
      await this.$([`yarn docusaurus start`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$2 = Command =>
  class extends Command {
    static paths = [[`kjo`, `build`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([`yarn kjo build cjs`, `yarn kjo build esm`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var cjs = Command =>
  class extends Command {
    static paths = [[`kjo`, `build`, `cjs`]]

    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:cjs`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var esm = Command =>
  class extends Command {
    static paths = [[`kjo`, `build`, `esm`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:esm`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$1 = Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn kjo lint eslint`,
        `yarn kjo lint skypack`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var eslint = Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `eslint`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run lint`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var skypack = Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `skypack`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all = Command =>
  class extends Command {
    static paths = [[`kjo`, `test`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([`yarn kjo test unit`], false)
      await this.$([`yarn kjo test integration`], false)
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var integration = Command =>
  class extends Command {
    static paths = [[`kjo`, `test`, `integration`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([`node ./jest.integration.js`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var unit = Command =>
  class extends Command {
    static paths = [[`kjo`, `test`, `unit`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util"`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var makeCommand = (Command, exec) =>
  class Base extends Command {
    constructor(options) {
      super(options)
    }

    async $(cmds) {
      await Promise.all(
        cmds.map(async cmd => {
          const [invoke, ...params] = cmd.split(' ')

          try {
            return exec(invoke, params)
          } catch (err) {
            throw new Error(err)
          }
        }),
      )

      return Promise.resolve()
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

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
        dev(Base),
        ci(Base),
        all(Base),
        unit(Base),
        integration(Base),
        all$3(Base),
        cjs$1(Base),
        esm$1(Base),
        all$2(Base),
        cjs(Base),
        esm(Base),
        all$1(Base),
        skypack(Base),
        eslint(Base),
        build(Base),
        readme(Base),
        start(Base),
      ],
    }
  },
}

module.exports = plugin
