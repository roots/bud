import {isNull} from 'lodash'

import type {Framework} from './'

/**
 *  Make a child compiler.
 *
 *  **make** takes two parameters:
 *
 *  - The **name** of the new compiler
 *  - An optional callback to use for configuring the compiler.
 *
 *  ```js
 *  bud.make('scripts', child => child.entry('app', 'app.js'))
 *  ```
 *
 *  This function returns the parent bud instance for further chaining. It is also possible to reference the parent instance using {@link Framework.parent}.
 *
 *  ```js
 *  make('scripts', child => {
 *    child.entry('app', 'app.js')
 *    child.parent.dev({
 *      // ...
 *    })
 *  })
 *  ```
 */
type Make = (
  this: Framework,
  name: string,
  tap?: Framework.Tapable,
) => Framework

const make: Make = function (name, tap?) {
  handleChildNestingError.bind(this)()

  this.info(`Making child compiler: ${name}`)

  /**
   * Instantiate a new instance
   */
  this.children.set(
    name,
    new this.implementation({
      name,
      mode: this.mode,
      services: this.options.services,
      config: this.options.config,
      parent: this,
    }).bootstrap(),
  )

  /**
   * This handles the tap
   */
  this.get(name, tap)

  /**
   * Return Framework
   */
  return this
}

/**
 * Prevent children from making further nested child compilers.
 */
function handleChildNestingError(this: Framework) {
  if (!isNull(this.parent)) {
    this.error(
      `\`${this.name}\` is a child compiler but you tried to call make from it. Try \`${this.name}.parent.make\` instead.`,
      `${this.name}.make`,
    )

    process.exit(1)
  }
}

export {make, Make}
