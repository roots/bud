import {React, FunctionComponent, Box} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {Prettier} from '@roots/ink-prettier'
import {Framework} from '@roots/bud-typings'

export const Debug: FunctionComponent<{bud: Framework}> = ({bud}) => {
  const {col, ctx} = useStyle()

  return (
    <Box
      flexDirection={ctx(['column', 'row'])}
      width={col(12)}
      justifyContent="space-between">
      <Prettier parser="json-stringify">
        {JSON.stringify(bud.config.getStore())}
      </Prettier>
    </Box>
  )
}
