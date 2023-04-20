import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import omit from '@roots/bud-support/lodash/omit'
import type * as TsLoader from 'ts-loader'

/**
 * Typescript configuration options
 */
interface Options extends TsLoader.Options {
  babel: boolean
}

/**
 * Typescript configuration
 */
@label(`@roots/bud-typescript`)
@expose(`typescript`)
@options<Options>({
  babel: false,
  transpileOnly: true,
  configFile: `tsconfig.json`,
})
@dependsOn([`@roots/bud-typescript/typecheck`])
export default class BudTypeScript extends Extension<Options> {
  /**
   * Typechecking controls
   */
  public get typecheck() {
    return this.app.extensions.get(`@roots/bud-typescript/typecheck`)
  }

  /**
   * Disable or enable babel
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.typescript.set('babel', false)
   * ```
   */
  @bind
  @deprecated(`bud.typescript`, `Use bud.typescript.set instead`, [
    [`Enable babel`, `bud.typescript.set('babel', true)`],
    [`Disable babel`, `bud.typescript.set('babel', false)`],
  ])
  public useBabel(enable: boolean = true): this {
    this.set(`babel`, enable)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    const loader = await this.resolve(`ts-loader`, import.meta.url)
    const typescript = await this.resolve(`typescript`, import.meta.url)

    /**
     * If a tsconfig.json file is present we'll set the config option automatically.
     */
    if (bud.context.files[`tsconfig.json`])
      this.set(`configFile`, bud.context.files[`tsconfig.json`].path)

    /**
     * Set the compiler and context options
     */
    this.set(`compiler`, typescript).set(`context`, bud.context.basedir)

    /**
     * Resolve .ts, .tsx, .jsx extensions
     */
    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set([])) =>
      extensions.add(`.ts`).add(`.jsx`).add(`.tsx`),
    )

    bud.build
      .setLoader(`ts`, loader)
      .setItem(`ts`, {loader: `ts`})
      .setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
      })
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    /**
     * Warn if no tsconfig.json was found or explicitly provided
     */
    if (!this.get(`configFile`))
      this.logger.warn(
        `No tsconfig.json found. You should create one in your project root or specify one with the \`configFile\` option.`,
      )

    /**
     * The `babel` option is not a ts-loader option, so we'll omit it
     */
    bud.build.items.ts.setOptions(omit(this.options, `babel`))

    const items = [bud.build.items.ts]
    if (this.get(`babel`) && bud.build.items.babel)
      items.unshift(bud.build.items.babel)

    bud.build.rules.ts.setUse(items)
    bud.build.rules.js.setUse(items)
  }
}
