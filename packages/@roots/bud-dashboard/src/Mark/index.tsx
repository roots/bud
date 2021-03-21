import {React, Box, BigText, Gradient} from '@roots/bud-support'
import {Static} from 'ink'

export const Mark = ({text}) => (
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
