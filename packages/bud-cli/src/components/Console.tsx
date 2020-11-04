import React, {useState} from 'react'
import {Text} from 'ink'
import patchConsole from 'patch-console'

const Console = () => {
  const [lastConsole, setLastConsole] = useState(null)
  const [text, setText] = useState('')

  patchConsole((stream, data) => {
    setLastConsole(data)

    const frameOut =
      lastConsole !== data ? `${text}${data}` : text
    setText(frameOut)
  })

  return <Text>{text ?? ''}</Text>
}

export {Console as default}
