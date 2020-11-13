import {yargs} from '@roots/bud-support'
import {Indexed} from '@roots/bud-typings'

export const {argv: args} = yargs

export type Args = Indexed<typeof args>
