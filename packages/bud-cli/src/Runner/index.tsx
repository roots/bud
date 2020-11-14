import React from 'react'
import {render, Instance} from 'ink'
import Compile from '../containers/Compile'
import {Serve} from '../containers/Serve'
import type {Bud} from '@roots/bud-typings'

export class Runner {
  public bud: Bud.Contract
  public instance: Instance

  constructor(bud: Bud.Contract) {
    this.bud = bud
  }

  public run = function (): void {
    this.instance = this.bud.mode.is('development')
      ? render(<Serve bud={this.bud} />)
      : render(<Compile bud={this.bud} />)
  }

  public kill = function (): void {
    this.instance.quit()
  }
}
