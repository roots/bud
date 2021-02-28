import {
  Box,
  React,
  useState,
  patchConsole,
  Text,
  Spinner,
} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export const Console = ({bud}: {bud: Framework}) => {
  const [text, setText] = useState('')

  patchConsole((stream, data) => {
    setText(data)
  })

  return (
    <Box
      paddingX={1}
      flexDirection="column"
      borderColor="dimWhite"
      borderStyle="round"
      height={10}>
      <Text>
        {text && <Text wrap="truncate-start">{text}</Text>}
      </Text>
      <Box marginTop={0}>
        <Text>
          <Spinner /> Watching
        </Text>
      </Box>
    </Box>
  )
}
