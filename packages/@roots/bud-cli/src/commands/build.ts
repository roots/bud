import {Error} from '@roots/bud-dashboard'
import Command from '../Command'
import * as source from '../source'

/**
 * Publish
 */
export default class Build extends Command {
  public name = `build`

  public signature: Command['signature'] = '<mode>'

  public description: Command['description'] =
    'Compile assets and/or initialize development server'

  public arguments: Command['arguments'] = {
    mode: '"development" or "production"',
  }

  public options: Command['options'] = [
    ['--src <src>', 'Directory to compile from', 'src'],
    ['--dist <dist>', 'Directory to compile to', 'dist'],
    ['--storage <storage>', 'Directory to store build artifacts, caches, logs, etc.', '.bud'],
    ['--modules <node_modules>', 'Directory containing modules', 'node_modules'],
    ['--ci', 'Run in CI mode', false],
    ['--debug', 'Enable debug mode. Enables logger and generates a webpack config artifact (saved to `storage`)', false],
    ['--clean', 'Clean stale assets from dist directory during compilation', true],
    ['--devtool', 'Specify a sourcemap implementation', false],
    ['--log', 'Present logger output in terminal', false],
    ['--manifest', 'Generate a manifest.json file', true],
    ['--minify', 'Minify compiled assets', false],
    ['--runtime', 'Enable code splitting', false],
    ['--vendor', 'Separate application and vendor code', false],
  ]

  public action({mode}) {
    try {
      source.preflight()
      source.isStatic() ? source.json() : source.api()
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  }
}
