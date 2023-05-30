import {join} from 'node:path'

import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import merge from '@roots/bud-support/lodash/merge'
import type {Options} from '@swc/core'

import {BudJSCApi, type BudJSCPublicInterface} from './jsc.js'
import {BudSWCApi, type BudSWCPublicInterface} from './options.js'

/**
 * SWC extension
 */
@label(`@roots/bud-swc`)
@expose(`swc`)
class BudSWC extends BudSWCApi {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.ecmascript = new BudJSCApi(
      bud,
    ) as unknown as BudJSCPublicInterface
    this.ecmascript.setParser({
      syntax: `ecmascript`,
      jsx: true,
    })

    this.typescript = new BudJSCApi(
      bud,
    ) as unknown as BudJSCPublicInterface
    this.typescript.setParser({
      syntax: `typescript`,
      tsx: true,
    })

    const loader = await this.resolve(`swc-loader`, import.meta.url)

    const swcrcPath = bud.context.files?.[`.swcrc`]?.path
    if (swcrcPath) {
      const swcrc = bud.fs.json.parse(await bud.fs.read(swcrcPath))
      if (swcrc) this.setOptions(swcrc)
    }

    /** set loader alias */
    bud.hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      'swc-loader': loader,
    }))

    bud.build
      .setLoader(`swc`, `swc-loader`)
      .setItem(`swc-typescript`, {
        loader: `swc`,
        options: () =>
          merge({}, this.options, {
            jsc: this.typescript.options,
          }),
      })
      .setItem(`swc-ecmascript`, {
        loader: `swc`,
        options: () =>
          merge({}, this.options, {
            jsc: this.ecmascript.options,
          }),
      })

    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.tsx`).add(`.jsx`),
    )

    this.set(
      `jsc.experimental.cacheRoot` as any,
      (cacheRoot: string) =>
        cacheRoot ?? join(bud.cache.cacheDirectory, `swc`),
    )
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build, hooks, path, when}) {
    build.getRule(`js`).setUse(() => [`swc-ecmascript`])

    when(
      `ts` in build.rules,
      ({build}) => build.getRule(`ts`).setUse(() => [`swc-typescript`]),
      ({build, hooks}) =>
        build.setRule(`ts`, {
          include: [path(`@src`)],
          test: hooks.filter(`pattern.ts`, /\.tsx?$/),
          use: [`swc-typescript`],
          resolve: {
            fullySpecified: false,
          },
        }),
    )

    hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.jsx`).add(`.tsx`).add(`.mts`),
    )
  }

  /**
   * Set SWC plugins
   */
  @bind
  public plugins(
    input:
      | Options[`jsc`][`experimental`][`plugins`]
      | ((
          input: Options[`jsc`][`experimental`][`plugins`],
        ) => Options[`jsc`][`experimental`][`plugins`]),
  ) {
    const value =
      typeof input === `function`
        ? input(this.options?.jsc?.experimental?.plugins ?? [])
        : input

    this.setJsc(jsc => ({
      ...(jsc ?? {}),
      experimental: {
        ...(jsc?.experimental ?? {}),
        plugins: [...(jsc?.experimental?.plugins ?? []), ...(value ?? [])],
      },
    }))
  }
}

export {BudSWC, BudSWCApi, type BudSWCPublicInterface}
