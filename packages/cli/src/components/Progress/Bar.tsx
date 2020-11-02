import React, {FunctionComponent} from 'react'
import {Text} from 'ink'

import useAppStyles from '../../hooks/useAppStyles'

interface BarProps {
  color?: string
  backgroundColor?: string
  percent: number
  character?: string
}

type BarComponent = FunctionComponent<BarProps>

const Bar: BarComponent = ({
  color = 'white',
  percent,
  backgroundColor = 'transparent',
  character = '\u2588',
}) => {
  const {col, ctx, is} = useAppStyles()

  const drawBar = () => {
    const width = ctx([col(12), col(10), col(11)])
    const max = Math.min(
      Math.floor((width * percent) / 100),
      width,
    )

    return is(max > 0, character.repeat(max))
  }

  return (
    <Text backgroundColor={backgroundColor} color={color}>
      {drawBar()}
    </Text>
  )
}

export {Bar as default}
