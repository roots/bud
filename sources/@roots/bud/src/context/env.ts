import {dotenv, dotenvExpand} from '@roots/bud-support'
import {join} from 'node:path'

export class Env {
  /**
   * Env values
   * @public
   */
  public values: Record<string, string | undefined>

  /**
   * Constructor
   *
   * @param baseDirectory -- nearest directory containing package.json from root
   * @returns
   */
  public constructor(public baseDirectory: string) {
    const {parsed, error} = dotenv.config({
      path: join(this.baseDirectory, '.env'),
    })
    if (error || !parsed) return

    const expanded = dotenvExpand({
      ignoreProcessEnv: false,
      parsed: parsed,
    })
    if (!expanded) return

    Object.entries(expanded).map(([k, v]) => {
      this.values[k] = v
    })
  }
}
