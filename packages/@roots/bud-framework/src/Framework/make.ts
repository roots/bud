import {isNull} from 'lodash'

import type {Framework} from './'

interface make {
  (
    this: Framework,
    name: string,
    tap?: Framework.Tapable,
  ): Framework
}

function make(
  this: Framework,
  name: string,
  tap?: Framework.Tapable,
): Framework {
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

export {make}
