import React from 'react'
import BigText from 'ink-big-text'
import Gradient from 'ink-gradient'
import {Box, Static} from 'ink'

export const Mark: React.FunctionComponent<{text: string}> = ({
  text,
}) => (
  <Static items={[{id: 0, text}]}>
    {header => (
      <Box
        key={header.id}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start">
        <Gradient name="teen">
          <BigText font="tiny" text={header.text} />
        </Gradient>
      </Box>
    )}
  </Static>
)
