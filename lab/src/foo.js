import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const root = document.querySelector('#root')

const MyApp = () => {
  const [state, setState] = useState('')

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="text-xl text-center text-gray-400">
        <input onChange={e => setState(e.value)} type="text" placeholder="foobarns" value={state} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <MyApp />,
  root,
);;

module?.hot && module.hot.accept(err => {
  console.error(err)
})
