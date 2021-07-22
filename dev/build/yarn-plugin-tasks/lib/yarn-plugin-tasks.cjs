'use strict'

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$3 = Command =>
  class extends Command {
    static paths = [[`kjo`, `build`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [`yarn kjo build cjs`, `yarn kjo build esm`],
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var cjs$1 = Command =>
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
var esm$1 = Command =>
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
var clean = Command =>
  class extends Command {
    static paths = [[`kjo`, `clean`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `rm -rf **/.budfiles`,
          `rm -rf **/node_modules`,
          `rm -rf examples/*/dist`,
          `rm -rf examples/sage/public/*`,
          `rm -rf examples/sage/storage/bud/*`,
          `rm -rf packages/*/*/lib`,
          `rm -rf packages/*/*/types`,
        ],
        `yarn cache clean`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

const ERROR = 1
const OK = 0

var makeCommand = (Command, exec) =>
  class Base extends Command {
    constructor(options) {
      super(options)
    }

    /**
     * Run a series of sequential and/or parallel taskes
     */
    async $(options) {
      const exitCode = await options.reduce(
        this.sequential.bind(this),
        this.promiseOK(),
      )

      this.taskFailed(exitCode) && process.exit(ERROR)

      return Promise.resolve(OK)
    }

    /**
     * Run tasks sequentially
     */
    async sequential(promise, task) {
      const exitCode = await promise

      if (this.taskFailed(exitCode)) return ERROR

      return Array.isArray(task)
        ? this.$(task)
        : this.runTask(task)
    }

    /**
     * Run a single task
     */
    runTask(task) {
      const [invoke, ...params] = task.split(' ')
      return exec(invoke, params)
    }

    /**
     * Check task status
     */
    taskFailed(code) {
      return Array.isArray(code)
        ? code.filter(c => c !== OK).length > 0
        : code !== OK
    }

    /**
     * Promise OK
     */
    async promiseOK() {
      return OK
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$2 = Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `yarn kjo lint eslint`,
          `yarn kjo lint prettier`,
          `yarn kjo lint skypack`,
        ],
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
        [
          `yarn eslint packages/**/src/**/*.{js,jsx,ts,tsx} --fix`,
          `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
        ],
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var prettier = Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `prettier`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `yarn prettier packages/**/src/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
          `yarn prettier examples/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
          `yarn prettier dev/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
        ],
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
var ci = Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `ci`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo (CI)`,
    }

    async execute() {
      await this.$([
        `yarn install --immutable`,
        `yarn kjo build cjs`,
        `yarn kjo test unit`,
        `yarn kjo test integration`,
        [`yarn kjo lint eslint`, `yarn kjo lint skypack`],
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var dev = Command =>
  class extends Command {
    static paths = [[`kjo`, `make`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn kjo clean`,
        `yarn install --immutable`,
        `yarn kjo build`,
        [`yarn kjo test unit`, `yarn kjo lint skypack`],
        `yarn install`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all$1 = Command =>
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
var cjs = Command =>
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
var esm = Command =>
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
        [`yarn ts-node ./dev/site`, `yarn kjo site readme`],
      ])
      await this.$([`yarn docusaurus build`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var readme = Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `readme`]]
    static usage = {category: `kjo`}

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
      await this.$([
        `yarn ts-node ./dev/site`,
        `yarn docusaurus start`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
var all = Command =>
  class extends Command {
    static paths = [[`kjo`, `test`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [`yarn kjo test unit`, `yarn kjo test integration`],
      ])
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
        all$1(Base),
        cjs(Base),
        esm(Base),
        all$3(Base),
        cjs$1(Base),
        esm$1(Base),
        all$2(Base),
        skypack(Base),
        eslint(Base),
        prettier(Base),
        build(Base),
        readme(Base),
        start(Base),
      ],
    }
  },
}

module.exports = plugin
