import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const myApp = () => {
  const [state, setState] = useState('')

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="text-xl text-center text-gray-400">
        <input
          onChange={e => setState(e.value)}
          type="text"
          placeholder="foobarns"
          value={state}
        />
      </div>
    </div>
  )
}

export {myApp}
