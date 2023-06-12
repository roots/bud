import * as Ink from '@roots/bud-support/ink'

export interface Props {
  color: string
  label: string
  message: string
}

export const Message = ({color, label, message}: Props) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>
      <Ink.Text color={color}>[{label}]</Ink.Text>
      {` `}
      <Ink.Text>{message}</Ink.Text>
    </Ink.Text>
  </Ink.Box>
)
