import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'

export const Errors: FunctionComponent<{
  errors: string[]
}> = ({errors}) => (
  <Box flexDirection="column">
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      marginBottom={1}
      padding={1}>
      {errors?.map((err, id) => (
        <Text key={id} wrap="wrap">
          {err}
        </Text>
      ))}
    </Box>
  </Box>
)
