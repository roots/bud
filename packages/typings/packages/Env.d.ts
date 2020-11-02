import type dotenv from 'dotenv'

/**
 * Environment variables utility.
 */
export type Env = Framework.Container<dotenv.DotenvParseOutput>
