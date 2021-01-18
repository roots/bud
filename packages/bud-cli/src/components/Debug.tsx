import {React, FunctionComponent, Box} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {Framework} from '@roots/bud-typings'
import {Console} from './Console'

export const Debug: FunctionComponent<{bud: Framework}> = ({
  bud,
}) => {
  const {col, ctx} = useStyle()

  return bud?.compiler?.instance ? (
    <Box
      flexDirection={ctx(['row', 'column'])}
      width={col(12)}
      justifyContent="space-between">
      <Console bud={bud} />
    </Box>
  ) : (
    <Box></Box>
  )
}
