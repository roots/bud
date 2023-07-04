import {join} from 'node:path'

import {type Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import merge from '@roots/bud-support/lodash/merge'

import {BudJSCApi, type BudJSCPublicInterface} from './jsc.js'
import {BudSWCApi, type BudSWCPublicInterface} from './options.js'

/**
 * SWC extension
 */
@label(`@roots/bud-swc`)
@expose(`swc`)
class BudSWC extends BudSWCApi {
  /**
   * Ecmascript specific configuration
   */
  public declare ecmascript: BudJSCPublicInterface

  /**
   * Typescript specific configuration
   */
  public declare typescript: BudJSCPublicInterface

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build, hooks, when}) {
    build.getRule(`js`).setUse(() => [`swc-ecmascript`])

    when(
      `ts` in build.rules,
      ({build}) => build.getRule(`ts`).setUse(() => [`swc-typescript`]),
      ({build, hooks}) =>
        build.setRule(`ts`, {
          include: [({path}) => path(`@src`)],
          resolve: {
            fullySpecified: false,
          },
          test: hooks.filter(`pattern.ts`, /\.tsx?$/),
          use: [`swc-typescript`],
        }),
    )

    hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.jsx`).add(`.tsx`).add(`.mts`),
    )
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    const loader = await this.resolve(`swc-loader`, import.meta.url)
    if (!loader) throw new Error(`@roots/bud-swc: swc-loader not found`)

    this.ecmascript = new BudJSCApi(bud).setParser({
      jsx: true,
      syntax: `ecmascript`,
    })

    this.typescript = new BudJSCApi(bud).setParser({
      syntax: `typescript`,
      tsx: true,
    })

    this.setExperimental(experimental => ({
      ...experimental,
      cacheRoot:
        experimental?.cacheRoot ?? join(bud.cache.cacheDirectory, `swc`),
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

    /** set loader alias */
    bud.hooks
      .on(`build.resolveLoader.alias`, (aliases = {}) => ({
        ...aliases,
        'swc-loader': loader,
      }))
      .hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
        extensions.add(`.ts`).add(`.tsx`).add(`.jsx`),
      )

    /**
     * Override options with .swcrc, if available
     */
    const swcrcPath = bud.context.files?.[`.swcrc`]?.path
    if (swcrcPath) {
      const swcrc = bud.fs.json.parse(await bud.fs.read(swcrcPath))
      if (swcrc) this.setOptions(swcrc)
    }
  }
}

export {BudSWC, BudSWCApi, type BudSWCPublicInterface}
export type * from './options.js'
export type * from './jsc.js'
