import * as Ink from 'ink'

export interface Props {
  color: string
  label: string
  message: string
}

export const Message = ({label, message, color}: Props) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>
      <Ink.Text color={color}>[{label}]</Ink.Text>
      {` `}
      <Ink.Text>{message}</Ink.Text>
    </Ink.Text>
  </Ink.Box>
)
