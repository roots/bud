import {Framework, Service} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack'

declare module '@roots/bud-framework' {
  interface Extensions extends Service {
    /**
     * Add an extension
     */
    add(extension: Module): void

    /**
     * Get an extension by name
     */
    get<Extension>(name: string): Extension

    /**
     * Make all extensions which are webpack plugins.
     */
    make(): WebpackPluginInstance[]

    /**
     * Remove an extension by name
     */
    discard(pkg: string): Framework
  }
}
