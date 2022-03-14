import * as Framework from '@roots/bud-framework'
import {BaseContext} from 'clipanion'
import process from 'node:process'
import {Readable, Writable} from 'node:stream'

import {Application} from './application'
import {Disk} from './disk'

export class Context implements Framework.Context, BaseContext {
  public args: Record<string, string | boolean | undefined | number> = {}
  public constructor(
    public name: string,
    public cwd: string,
    public projectDir: string,
    public manifest: Record<string, any>,
    public disk: Disk,
    public application: Application,
    public env: Record<string, string | undefined> = {},
    public stdin: Readable = process.stdin,
    public stdout: Writable = process.stdout,
    public stderr: Writable = process.stderr,
    public colorDepth: number = 256,
  ) {}
}
