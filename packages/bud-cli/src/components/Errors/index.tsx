import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'

const Errors: FunctionComponent<Props> = ({errors}) => (
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

interface Props {
  errors: string[]
}

export {Errors as default}
