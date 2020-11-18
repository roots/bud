import React from 'react'
import {render, Instance} from 'ink'
import Compile from '../containers/Compile'
import {Serve} from '../containers/Serve'
import type {Bud} from '@roots/bud-typings'

/**
 * ## bud.cli
 *
 * Ink application controller.
 */
export class Runner {
  /** Bud reference */
  public bud: Bud.Ref

  /**
   * ## bud.cli.instance
   *
   * Ink instance
   */
  public instance: Instance

  /**
   * Class constructor.
   */
  constructor(bud: Bud.Bud) {
    this.bud = bud.get
  }

  /**
   * Run the compilation.
   */
  public run = function (): void {
    this.instance = this.bud().mode.is('development')
      ? render(<Serve framework={this.bud} />)
      : render(<Compile framework={this.bud} />)
  }

  public kill = function (): void {
    this.instance.quit()
  }
}
