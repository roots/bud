import {dotenv, dotenvExpand} from '@roots/bud-support'
import {join} from 'node:path'

export class Env implements Record<string, string | undefined> {
  [key: string]: string | undefined

  public constructor(public baseDirectory: string) {
    const search = dotenv.config({path: join(this.baseDirectory, '.env')})
    if (search.error) return

    const expanded = dotenvExpand(search.parsed)

    Object.entries(expanded).map(([k, v]) => {
      this[k] = v
    })
  }
}
