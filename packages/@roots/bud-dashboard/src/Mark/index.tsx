import {React, Box, BigText, Gradient} from '@roots/bud-support'

export const Mark = ({text}) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="flex-start">
    <Gradient name="teen">
      <BigText font="tiny" text={text} />
    </Gradient>
  </Box>
)
