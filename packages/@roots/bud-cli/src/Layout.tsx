import {React, Gradient, BigText, Box} from '@roots/bud-support'

export const Layout = ({name, children}) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="flex-start">
    <Gradient name="teen">
      <BigText font="tiny" text={name} />
    </Gradient>

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      paddingX={1}>
      {children}
    </Box>
  </Box>
)
