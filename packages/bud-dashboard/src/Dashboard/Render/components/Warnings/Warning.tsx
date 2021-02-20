import {
  React,
  useEffect,
  FunctionComponent,
  Box,
  Text,
  notify,
} from '@roots/bud-support'

interface WarningProps {
  message: string
}

type WarningComponent = FunctionComponent<WarningProps>

const Warning: WarningComponent = ({message}) => {
  useEffect(() => {
    message &&
      notify({
        title: 'Warning',
        message,
      })
  }, [message])

  return (
    <Box flexDirection="column">
      {message && <Text wrap="wrap">{message}</Text>}
    </Box>
  )
}

export {Warning}
