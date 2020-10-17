import Ink from 'ink'
import * as Framework from '../Framework'

export as namespace CLI

export type App = (props: Props) => Ink.Instance

export interface Props {
  bud: Framework.Bud
}

export * as hooks from './hooks'
