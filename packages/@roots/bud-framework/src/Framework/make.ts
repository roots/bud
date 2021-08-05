import type {Framework} from './'

interface make {
  (name: string, tap?: Framework.Tapable): Framework
}

function make(name: string, tap?: Framework.Tapable): Framework {
  handleChildNestingError.bind(this)()

  this.info(`Making child compiler: ${name}`)

  /**
   * Instantiate a new instance
   */
  this.children.set(
    name,
    new this.implementation({
      name,
      parent: this,
    }).bootstrap(),
  )

  /**
   * Tap, if applicable
   */
  tap && this.get(name, tap)

  /**
   * Return Framework
   */
  return this
}

/**
 * Prevent children from making further nested child compilers.
 */
function handleChildNestingError(this: Framework) {
  !this.isParent &&
    this.error(
      `\`${this.name}\` is a child compiler but you tried to call make from it. Try \`${this.name}.parent.make\` instead.`,
      `${this.name}.make`,
    )
}

export {make}
