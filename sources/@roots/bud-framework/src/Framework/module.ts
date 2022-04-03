import { bind, importFrom, lodash, pkgUp, resolveFrom } from '@roots/bud-support';
import { dirname } from 'node:path';

import { Framework } from '.';

const {isArray, isString} = lodash

export class Module {
  public constructor(public app: Framework) {}

  @bind
  public arr(
    request: string | Array<string | [string, string]>,
  ): Array<[string, string]> {
    return (isString(request) ? [this.app.path(), request] : request).map(
      req => (isArray(req) ? req : [this.app.path(), req]),
    )
  }

  public reduceUntil<T = any>(
    data: Array<[string, string]>,
    fn: (...data: [string, string]) => T,
  ): T {
    return data.reduce(
      (a: T, c: [string, string]) => a ?? fn(...c),
      null,
    ) as T
  }

  @bind
  public async path(
    candidates: string | Array<string | [string, string]>,
  ) {
    const manifest = await this.manifestPath(candidates)
    return dirname(manifest)
  }

  @bind
  public async manifestPath(
    paths: string | Array<string | [string, string]>,
  ) {
    return await pkgUp.pkgUp({cwd: this.resolve(paths)})
  }

  @bind
  public async readManifest(
    paths: string | Array<string | [string, string]>,
  ) {
    const manifestPath = await this.manifestPath(paths)
    return await this.app.json.read(manifestPath)
  }

  @bind
  public resolve(
    importPaths: string | Array<string | [string, string]>,
  ): string {
    return this.reduceUntil<string>(
      this.arr(importPaths),
      resolveFrom.silent,
    )
  }

  @bind
  public import<T = any>(
    importPaths: string | Array<string | [string, string]>,
  ): T {
    const fn = importFrom.silent as (str: string, str2: string) => T
    return this.reduceUntil<T>(this.arr(importPaths), fn)
  }

  @bind
  public resolvePreferred(
    name: string,
    ...importPaths: Array<string>
  ): string {
    return this.resolve([
      name,
      ...importPaths.map(
        (path: string): [string, string] => [path, name]),
    ])
  }
}
