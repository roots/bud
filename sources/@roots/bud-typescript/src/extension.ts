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

/**
 * Typescript configuration
 */
@label(`@roots/bud-typescript`)
@expose(`typescript`)
@options({
  babel: false,
  transpileOnly: true,
})
@dependsOn([`@roots/bud-typescript/typecheck`])
export default class BudTypeScript extends Extension {
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
  @deprecated(`bud.typescript`, `Use bud.typescript.set instead`, [
    [`Enable babel`, `bud.typescript.set('babel', true)`],
    [`Disable babel`, `bud.typescript.set('babel', false)`],
  ])
  public useBabel(enable: boolean = true): this {
    this.set(`babel`, enable)
    return this
  }

  /**
   * `register` callback
   */
  @bind
  public override async register(bud: Bud) {
    const loader = await this.resolve(`ts-loader`, import.meta.url)
    if (!loader) throw new Error(`ts-loader not found`)

    bud.build.setLoader(`ts`, loader)
    bud.build.setItem(`ts`, {loader: `ts`})
    bud.build.setRule(`ts`, {
      test: ({hooks}) => hooks.filter(`pattern.ts`),
      include: [({path}) => path(`@src`)],
    })

    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set([])) =>
      extensions.add(`.ts`).add(`.jsx`).add(`.tsx`),
    )
  }

  /**
   * `configAfter` callback
   */
  @bind
  public override async buildBefore(bud: Bud) {
    this.set(`context`, bud.context.basedir)

    bud.build.items.ts.setOptions(omit(this.options, `babel`))

    const items = [bud.build.items.ts]
    if (this.get(`babel`) && bud.build.items.babel)
      items.unshift(bud.build.items.babel)

    bud.build.rules.ts.setUse(items)
    bud.build.rules.js.setUse(items)
  }
}
