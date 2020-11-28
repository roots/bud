import React, {useState} from 'react'
import image from '../image.png'

export const MyApp = () => {
  const [state, setState] = useState('')

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="text-xl text-center text-gray-400">
        <img src={image} />

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
