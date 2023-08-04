import type {Factory} from '@roots/bud-build/config'

export const context: Factory<`context`> = async ({path}) => path(`@src`)
