import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import {Webpack} from '@roots/bud-support/webpack'

export const Validate = ({
  config,
}: {
  config: Partial<Webpack.Configuration>
}) => {
  try {
    Webpack.validate(config)

    return (
      <Box>
        <Text color="green">
          {figures.tick} webpack validated configuration
        </Text>
      </Box>
    )
  } catch (error) {
    return (
      <Box>
        <Text color="red">❌ {error?.message ?? error}</Text>
      </Box>
    )
  }
}
