import React from 'react'
import {Box, Color, Text} from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

import pkg from '../../../package.json'

const Banner = () => (
  <Box flexDirection="row" alignItems="center" marginBottom={0} paddingBottom={0}>
    <Box marginRight={1} marginBottom={0} marginTop={0}>
      <Gradient name="teen">
        <BigText
          text="Bud"
          font="simple3d"
          marginTop={0}
          marginBottom={0}
          paddingBottom={0}
        />
      </Gradient>
    </Box>
    <Box flexDirection="column" marginBottom={0} marginTop={0}>
      <Text bold>
        <Color green>
          ⚡️ {pkg.name} [{pkg.version}]
        </Color>
      </Text>
      <Text uppercase>
        <Color red>⚠</Color> This software is pre-release
      </Text>
    </Box>
  </Box>
)

export default Banner
