import '@roots/bud-framework'
import {Api as ApiInterface} from './index'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## Api
     *
     * CLI dashboard interface
     */
    api: ApiInterface
  }

  type Api = ApiInterface
}
