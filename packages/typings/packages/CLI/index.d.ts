import * as Ink from 'ink'

export as namespace CLI

export type App = Ink.Instance

export type Controller = (bud: Framework.Bud) =>
  ControllerInterface

export interface ControllerInterface {
  bud: Framework.Bud
  instance?: App
  run: () => void
  kill: () => void
}

export * as hooks from './hooks'
