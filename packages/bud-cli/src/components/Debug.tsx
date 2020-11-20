import React, {FunctionComponent} from 'react'
import {Box} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {Bud} from '@roots/bud-typings'
import {Prettier} from '@roots/ink-prettier'

export const Debug: FunctionComponent<{bud: Bud.Bud}> = ({
  bud,
}) => {
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
