import type {Bud} from '@roots/bud'

import {isset} from '@roots/bud/cli/helpers/isset'
import get from '@roots/bud-support/get'
import isString from '@roots/bud-support/isString'
import noop from '@roots/bud-support/noop'

export type Override<T extends unknown> = [
  T,
  string,
  string,
  (bud: Bud) => (value: T) => Promise<unknown>,
  children?: boolean,
]

export default async function doOverrides(command: any) {
  await Promise.all(
    [
      [
        command.browserslistUpdate,
        `BUD_BROWSERSLIST_UPDATE`,
        `browserslistUpdate`,
        b => async v => (b.root.context.browserslistUpdate = v),
        false,
      ] satisfies Override<boolean>,
      [
        command.devtool,
        `BUD_DEVTOOL`,
        `devtool`,
        b => async v => b.devtool(v),
      ] satisfies Override<any>,
      [
        command.entrypoints,
        `BUD_ENTRYPOINTS`,
        `entrypoints`,
        b => async v => b.entrypoints.set(`emitHtml`, v),
      ] satisfies Override<boolean>,
      [
        command[`entrypoints.html`],
        `BUD_ENTRYPOINTS_HTML`,
        `entrypoints.html`,
        b => async v => b.entrypoints.set(`emitHtml`, v),
      ] satisfies Override<boolean>,
      [
        command.cache,
        `BUD_CACHE`,
        `cache`,
        b => async v => b.persist(v),
      ] satisfies Override<`filesystem` | `memory` | boolean>,
      [
        command.esm,
        `BUD_ESM`,
        `esm`,
        b => async v => b.esm.enable(v),
      ] satisfies Override<boolean>,
      [
        command.hash,
        `BUD_HASH`,
        `hash`,
        b => async value => b.hash(value),
      ] satisfies Override<boolean | string>,
      [
        command.hot,
        `BUD_HOT`,
        `hot`,
        b => async v =>
          b.root.hooks.on(
            `dev.middleware.enabled`,
            ware =>
              ware?.filter(key => (v === false ? key !== `hot` : v)) ?? [],
          ),
      ] satisfies Override<boolean>,
      [
        command.html,
        `BUD_HTML`,
        `html`,
        b => async v => (isString(v) ? b.html({template: v}) : b.html(v)),
      ] satisfies Override<boolean | string>,
      [
        command.immutable,
        `BUD_IMMUTABLE`,
        `immutable`,
        b => async v => b.cdn.freeze(v),
      ] satisfies Override<boolean>,
      [
        command.lazy,
        `BUD_LAZY`,
        `lazy`,
        b => async v => b.lazy(v),
      ] satisfies Override<boolean>,
      [
        command.minimize,
        `BUD_MINIMIZE`,
        `minimize`,
        b => async v => b.minimize(v),
      ] satisfies Override<`css` | `js` | boolean>,
      [
        command.proxy,
        `BUD_PROXY_URL`,
        `proxy.url`,
        b => async v =>
          b.root.hooks.on(
            `dev.middleware.proxy.options.target`,
            new URL(v),
          ),
        false,
      ] satisfies Override<string>,
      [
        command.runtime,
        `BUD_RUNTIME`,
        `runtime`,
        b => async v => b.runtime(v),
      ] satisfies Override<`multiple` | `single` | boolean>,
      [
        command.spa,
        `BUD_SPA`,
        `spa`,
        b => async v => {
          if (!isString(v)) return b.spa()

          if (v.match(/^\d/)) {
            return b.spa(parseInt(v))
          }

          return b.spa(v)
        },
      ] satisfies Override<boolean | string>,
      [
        command.splitChunks,
        `BUD_SPLIT_CHUNKS`,
        `splitChunks`,
        b => async v => b.splitChunks(v),
      ] satisfies Override<boolean>,
      [
        command.input,
        `BUD_PATH_INPUT`,
        `paths.input`,
        b => async v => b.setPath(`@src`, v),
      ] satisfies Override<string>,
      [
        command.output,
        `BUD_PATH_OUTPUT`,
        `paths.output`,
        b => async v => b.setPath(`@dist`, v),
      ] satisfies Override<string>,
      [
        command.publicPath,
        `BUD_PATH_PUBLIC`,
        `paths.public`,
        b => async v => b.setPublicPath(v),
      ] satisfies Override<string>,
      [
        command.storage,
        `BUD_PATH_STORAGE`,
        `paths.storage`,
        b => async v => b.hooks.on(`location.@storage`, b.relPath(v)),
      ] satisfies Override<string>,
      [
        command.url,
        `BUD_URL`,
        undefined,
        b => async v => b.setUrl(v),
      ] satisfies Override<string>,
      [
        command.use,
        undefined,
        undefined,
        b => async v =>
          await b.extensions.add(
            v.reduce((a, v) => [...a, ...v.split(`,`)], []),
          ),
      ] satisfies Override<Array<string>>,
    ].map(async ([value, key, path, callback, children]) => {
      await override(command.bud, value, key, path, callback, children)
    }),
  ).catch(noop)
}

async function override(
  bud: Bud,
  arg: unknown,
  env: string,
  manifestPath: string | undefined,
  fn: (bud: Bud) => (value: any) => Promise<any>,
  children: boolean = true,
) {
  if (
    !isset(arg) &&
    manifestPath &&
    bud.context.manifest?.bud &&
    manifestPath in bud.context.manifest?.bud
  ) {
    arg = get(bud.context.manifest.bud, manifestPath)
  }

  if (!isset(arg) && bud.env.has(env)) {
    arg = bud.env.get(env)
  }

  if (!isset(arg)) return

  await fn(bud)(arg)
  children && bud.hasChildren && (await withChildren(bud, arg, fn))
}

export const withChildren = async (
  bud: Bud,
  value: any,
  fn: (bud: Bud) => (value: any) => Promise<any>,
) => {
  bud.hasChildren &&
    (await Promise.all(
      [bud, ...Object.values(bud.children)].map(
        async bud => await fn(bud)(value).catch(noop),
      ),
    ))
}
