import type {Factory} from './index.js'

export const context: Factory<`context`> = async ({path}) => path(`@src`)
