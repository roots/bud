/**
 * Returns a hooks instance with application bindings.
 */
export const Hooks = function (
  params: Framework.Index<any>,
): void {
  this.logger = params.logger

  this.registered = {}

  this.make = function (hook: Framework.Hooks.Handler<any>) {
    return {
      hook,
      fired: false,
    }
  }

  this.entries = function () {
    return Object.entries(this.registered)
  }

  this.on = function (name, callback) {
    const entry = this.make(callback)

    if (!this.registered[name]) {
      this.registered[name] = []
    }

    this.registered[name].push(entry)

    return this
  }

  this.filter = function (
    name: string,
    value: unknown,
  ): unknown {
    if (!this.registered[name]) {
      return value
    }

    this.registered[name].map(entry => {
      value = entry.hook(value)

      return {
        hook: entry.hook,
        fired: true,
      }
    })

    return value
  }
}
