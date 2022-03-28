import {Framework} from '../'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (name: string, tap?: (app: Framework) => any): Promise<Framework>
}

/**
 * Prevent children from making further nested child compilers.
 *
 * @internal
 */
function handleChildNestingError(this: Framework) {
  !this.isRoot &&
    this.error(
      `\`${this.name}\` is a child compiler but you tried to call make from it. Try \`${this.name}.parent.make\` instead.`,
      `${this.name}.make`,
    )
}

/**
 * Instantiate a child instance and add to {@link Framework.children} container
 *
 * @remarks
 * **make** takes two parameters:
 *
 * - The **name** of the new compiler
 * - An optional callback to use for configuring the compiler.
 *
 * @example
 * ```js
 * bud.make('scripts', child => child.entry('app', 'app.js'))
 * ```
 *
 * @public
 */
export async function make(
  name: string,
  tap?: (app: Framework) => any,
): Promise<Framework> {
  const app = this as Framework

  handleChildNestingError.bind(app)()

  const instance = new app.implementation({
    name,
    mode: app.mode,
    childOf: app,
    config: {...app.options.config, name},
    context: app.context,
    services: app.options.services,
  })

  app.info(`new instance:`, name)

  await instance.lifecycle()

  if (tap) await tap(instance)

  app.children?.set(name, instance)

  return app
}
