import {
  React,
  Box,
  Text,
  FunctionComponent,
} from '@roots/bud-support'

declare namespace Error {
  export type Component = FunctionComponent<{
    title?: string
    body: string
  }>
}

export const Error: Error.Component = ({
  title = 'Error',
  body,
}) => (
  <Box flexDirection="column">
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      marginBottom={1}
      padding={1}>
      <Text wrap="wrap" bold>
        {title}
      </Text>
      <Text wrap="wrap">{body}</Text>
    </Box>
  </Box>
)
