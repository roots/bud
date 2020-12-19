import {
  React,
  useState,
  patchConsole,
  Text,
} from '@roots/bud-support'

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
