import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import type {Framework} from '@roots/bud-typings'

export const Splash: FunctionComponent<{
  bud: Framework
}> = () => {
  const {bounds} = useStyle()

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={bounds.width}
      height={bounds.height}
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="column" justifyContent="space-between">
        <Box flexDirection="row" marginTop={1} marginBottom={1}>
          <Text>Reticulating splines..</Text>
        </Box>
      </Box>
    </Box>
  )
}
