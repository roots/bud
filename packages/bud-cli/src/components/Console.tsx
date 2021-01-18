import {
  React,
  useState,
  patchConsole,
  Text,
} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export const Console = ({bud}: {bud: Framework}) => {
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
