/* eslint-disable no-console */
const {default: strip} = require('strip-ansi')

class Reporter {
  public current: any

  public update(update: any) {
    this.current = update
  }

  public isStale(update: any) {
    if (!this.current) return false
    return update.hash === this.current.hash
  }

  public problems: string

  public getProblems() {
    return this.problems
  }

  public setProblems(type, payload) {
    const newProblems = payload[type]
      .map(function (problem) {
        var isNested = typeof problem === 'object'
        var message = isNested ? problem.message : problem
        return strip(message)
      })
      .join('\n')

    if (!this.problems || this.problems !== newProblems) {
      this.problems = newProblems
    }
  }

  public clearProblems() {
    this.problems = null
  }

  public success() {
    this.clearProblems()
  }
}

module.exports = Reporter
