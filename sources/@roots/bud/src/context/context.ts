import type {Config as Options} from '@roots/bud-framework'

import type Bud from './bud.js'
import type Config from './config.js'
import type Extensions from './extensions.js'
import type Manifest from './manifest.js'

export default class Context implements Partial<Options.Context> {
  public args: Record<string, string | boolean | undefined | number> = {}

  public label: string

  public constructor(
    public basedir: string,
    public manifest: Manifest['data'],
    public config: Config['data'],
    public bud: Bud['data'],
    public env: Options.Context['env'],
    public extensions: Extensions['data'],
    public colorDepth: number = 256,
  ) {
    this.label = this.manifest.name ?? 'default'
  }
}
