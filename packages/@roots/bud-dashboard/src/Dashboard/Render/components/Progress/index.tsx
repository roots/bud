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
  /* const labelMax = 5 */
  /*   const barMax = Math.min(
    Math.floor(bounds.width - labelMax),
    bounds.width,
  )
 */
  return !(errors?.length > 0) ? (
    <Box
      display={'flex'}
      marginTop={1}
      width={col(12)}
      flexDirection={'row'}>
      {/* <Box width={labelMax}>
        <Text>
          {progress?.percentage}
          {''}
        </Text>
      </Box> */}

      <Bar
        maxWidth={bounds.width}
        colors={[colors.primary, colors.primaryAlt]}
        percent={progress?.decimal}
      />
    </Box>
  ) : null
}
