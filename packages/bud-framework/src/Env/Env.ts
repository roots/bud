import {dotenv} from '@roots/bud-support'
import {Container} from '@roots/container'

/**
 * Dotenv parsed contents.
 */
export type Data = dotenv.DotenvParseOutput

export default abstract class Env extends Container {}
