import {React, FunctionComponent} from '@roots/bud-support'
import {Bar} from './Bar'

import type {Styles} from '@roots/ink-use-style'
import type {Compiler} from '@roots/bud-typings'

interface Props {
  progress: Compiler.Progress
  bounds: Styles['bounds']
  col: Styles['col']
  colors: Styles['colors']
  hasErrors: boolean
}

export const Progress: FunctionComponent<Props> = ({
  progress,
  bounds,
  colors,
  hasErrors,
}) => {
  const showProgress =
    progress?.decimal &&
    bounds?.width &&
    typeof bounds?.width == 'number'

  const barGradient = !hasErrors
    ? [colors.primary, colors.primaryAlt]
    : [colors.error, colors.error]

  const maxWidth = bounds.width - 4

  return showProgress ? (
    <Bar
      character={'█'}
      maxWidth={maxWidth}
      colors={barGradient}
      percent={progress?.decimal}
    />
  ) : null
}
