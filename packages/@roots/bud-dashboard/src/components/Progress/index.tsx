import {React, Box} from '@roots/bud-support'
import {Bar} from './Bar'

import type {Styles} from '@roots/ink-use-style'
import type {Compiler} from '@roots/bud-typings'

export function Progress({
  progress,
  bounds,
  col,
  colors,
  errors,
}: {
  progress: Compiler.Progress
  bounds: Styles['bounds']
  col: Styles['col']
  colors: Styles['colors']
  errors: string[]
}): JSX.Element {
  return !(errors?.length > 0) ? (
    <Box
      display={'flex'}
      marginX={1}
      width={col(12)}
      flexDirection={'row'}>
      <Bar
        maxWidth={bounds.width - 2}
        colors={[colors.primary, colors.primaryAlt]}
        percent={progress?.decimal}
      />
    </Box>
  ) : null
}
