import {Config} from '@roots/bud-framework'
import {BaseContext} from 'clipanion'
import process from 'node:process'
import {Readable, Writable} from 'node:stream'

import {Application} from './application.js'
import {Disk} from './disk.js'
import {Env} from './env.js'

export class Context implements Config.Context, BaseContext {
  public args: Record<string, string | boolean | undefined | number> = {}
  public constructor(
    public name: string,
    public cwd: string,
    public projectDir: string,
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
