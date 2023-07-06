import {render} from 'solid-js/web'
import {createSignal} from 'solid-js'

const Counter = () => {
  const [count, setCount] = createSignal(0)
  const increment = () => setCount(count() + 1)

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  )
}

render(() => <Counter />, document.getElementById('root'))

if (import.meta.webpackHot)
  import.meta.webpackHot.accept(err => console.error(err))
