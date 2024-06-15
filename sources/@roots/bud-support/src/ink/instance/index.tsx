import * as Ink from '@roots/bud-support/ink'

let instance: Ink.Instance

const render = (node: Ink.ReactNode): Ink.Instance => {
  if (instance) {
    instance.rerender(node)
  } else {
    instance = Ink.render(node)
  }

  return instance
}

export {instance, render}
