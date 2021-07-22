/* eslint-disable @typescript-eslint/explicit-member-accessibility */

const ERROR = 1
const OK = 0

export default (Command, exec) =>
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
