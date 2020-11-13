import type Dotenv from 'dotenv'
import type {Indexed, Container} from '@roots/container'

/**
 * Environment variables utility.
 */
export namespace Env {
  export type Data = Dotenv.DotenvParseOutput
  export class Contract extends Indexed implements Container {
    repository: Container.Repository<Dotenv.DotenvParseOutput>
  }
}
