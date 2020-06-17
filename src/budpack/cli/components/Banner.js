import React from 'react'
import {Box} from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

/**
 * Banner
 */
const Banner = () => (
  <Box alignItems="center">
    <Gradient name="teen">
      <BigText
        text="Bud"
        font="simple3d"
        marginTop={0}
        marginBottom={0}
        paddingBottom={0}
        paddingTop={0}
      />
    </Gradient>
  </Box>
)

export default Banner
