import type {Config} from '@roots/bud-framework'
import type {BaseContext} from 'clipanion'
import process from 'node:process'
import type {Readable, Writable} from 'node:stream'

import type {Application} from './application.js'
import type {Disk} from './disk.js'
import type {Env} from './env.js'

export class Context implements Config.Context, BaseContext {
  public args: Record<string, string | boolean | undefined | number> = {}

  public constructor(
    public name: string,
    public dir: string,
    public manifest: Record<string, any>,
    public disk: Disk,
    public application: Application,
    public env: Env,
    public stdin: Readable = process.stdin,
    public stdout: Writable = process.stdout,
    public stderr: Writable = process.stderr,
    public colorDepth: number = 256,
  ) {}
}
