import React from 'react'
import {render, Instance} from 'ink'
import Compile from '../containers/Compile'
import {Serve} from '../containers/Serve'
import type {Bud} from '@roots/bud-typings'

export class Runner {
  public bud: Bud.Ref
  public instance: Instance

  constructor(bud: Bud.Contract) {
    this.bud = bud.get
  }

  public run = function (): void {
    this.instance = this.bud().mode.is('development')
      ? render(<Serve framework={this.bud} />)
      : render(<Compile framework={this.bud} />)
  }

  public kill = function (): void {
    this.instance.quit()
  }
}
