import {bind} from 'helpful-decorators'

import {Spinner} from './spinner.js'

/**
 * Line update
 *
 * @public
 */
export class Line {
  /**
   * Text
   *
   * @public
   */
  public text: string

  public spinner?: Spinner

  public interval: NodeJS.Timer

  public isComplete: boolean = false

  public get icon() {
    if (!this.spinner || this.isComplete) return null
    return this.spinner.frame
  }

  public get frame() {
    return this.icon ? [this.icon, this.text].join(' ') : this.text
  }

  public constructor(spinner = true) {
    if (spinner) this.spinner = new Spinner()
  }

  @bind
  public update(...text: Array<string>) {
    this.text = text[0] ? text?.join(' ') : null
    return this
  }

  @bind
  public complete(isComplete = true) {
    this.isComplete = isComplete
    return this
  }
}
