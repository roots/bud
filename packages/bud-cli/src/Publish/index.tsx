import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'

/**
 * Publish
 */
export const Publish: FunctionComponent<{
  file: string | number
}> = ({file}) => (
  <Box
    display="flex"
    justifyContent="flex-start"
    flexDirection="column">
    <Box display="flex" justifyContent="flex-start">
      <Text>
        Template named
        <Text color="blue" bold>
          &nbsp;{file}
        </Text>{' '}
        copied to{' '}
        <Text color="green" bold>
          publish/{file}
        </Text>
      </Text>
    </Box>
  </Box>
)
