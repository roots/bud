import type {Bud} from '@roots/bud'
import {Box, Text} from '@roots/bud-support/ink'

const DisplayEnv = ({bud}: {bud: Bud}) => {
  return (
    <Box flexDirection="column">
      <Text color="blue">
        {`\n`}Environment variables{`\n`}
      </Text>

      {bud.env
        .getEntries()
        .sort((a, b) =>
          a[0].toLowerCase().localeCompare(b[0].toLowerCase()),
        )
        .map(([key, value]) => {
          return (
            <Box flexDirection="row" key={key}>
              <Text>
                {key}={`${value}`}
              </Text>
            </Box>
          )
        })}
    </Box>
  )
}

export {DisplayEnv as default}
