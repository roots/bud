import * as api from './api'
import {Framework as Base} from '@roots/bud-framework'

export declare class Framework extends Base {
  public library: Library
}

export type Library = (
  this: Framework,
  modules: string[],
) => Framework

export {api}
