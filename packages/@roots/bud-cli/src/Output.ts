import {CLI} from './CLI'
import {Error} from '@roots/bud-dashboard'

export default class Output {
  public parent: CLI

  public _help

  public constructor(parent: CLI) {
    this.parent = parent
    this.help = this.instance.helpInformation()
  }

  public get instance() {
    return this.parent.instance
  }

  /**
   * Output configuration
   */
  public get config() {
    return {
      writeOut: this.writeOut.bind(this),
      writeErr: this.writeErr.bind(this),
      outputError: this.outputError.bind(this),
    }
  }

  public get help () {
    return this._help
  }

  public set help (help) {
    this._help = help
  }

  public writeOut(str: string) {
    return process.stdout.write(str)
  }

  public writeErr(str: string) {
    return process.stderr.write(str)
  }

  public outputError(str: string, write: (str: string) => void) {
    return write(Error(this.help, str))
  }
}
