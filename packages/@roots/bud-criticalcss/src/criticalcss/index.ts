import {Framework} from '@roots/bud-framework'
import Plugin from 'critical-css-webpack-plugin'

/**
 * Plugin name
 */
 export const name: Framework.Module['name'] = '@roots/bud-criticalcss'

/**
 * Plugin options
 */
export const options: Framework.CriticalCss.Options = () => ({
  src: 'index.html',
  target: 'index.css',
  inline: true,
  minify: true,
  extract: true,
  width: 375,
  height: 565,
  concurrency: 4,
  penthouse: {
    blockJSRequests: false
  }
})

/**
 * Plugin
 */
 export const make: Framework.Module.Make<Plugin, Framework.CriticalCss.Options> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
 export const when: Framework.Module.When = ({isProduction}) => isProduction
