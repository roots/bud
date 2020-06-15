import React from 'react'
import {Box, Color, Text, Static} from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

const Banner = () => (
  <Box flexDirection="row" alignItems="center" marginBottom={0} paddingBottom={0}>
    <Box marginBottom={0} marginTop={0}>
      <Gradient name="teen">
        <BigText
          text="Bud"
          font="simple3d"
          marginTop={0}
          marginBottom={0}
          paddingBottom={0}
          paddingTop={0}
          paddingRight={2}
        />
      </Gradient>
    </Box>
  </Box>
)

export default Banner
