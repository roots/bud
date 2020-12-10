import Dotenv from 'dotenv'
import {Container} from '.'

/**
 * Dotenv parsed contents.
 */
export type Data = Dotenv.DotenvParseOutput

export class Env extends Container {}
