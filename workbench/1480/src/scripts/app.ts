import {main} from '@src/scripts/components/main'

interface FooInterface {
  bar: string
}

const foo: FooInterface = {
  bar: 'huh',
}

const init = () =>
  window.requestAnimationFrame(function ready() {
    return document.body ? main() : window.requestAnimationFrame(ready)
  })

init()

// @ts-ignore
module?.hot?.accept('./components/main.js', init)
