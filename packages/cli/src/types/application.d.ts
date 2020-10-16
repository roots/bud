import Ink from 'ink'
import * as Framework from '@roots/bud-framework'

export as namespace Dash

export type App = (props: Props) => Ink.Instance

export interface Props {
  bud: Framework.Bud
}
