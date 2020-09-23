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
  color = 'green',
  percent,
  character = '\u2588',
}) => {
  const {col, ctx} = useAppStyles()

  const drawBar = () => {
    const width = ctx([col(12), col(10), col(11)])
    const max = Math.min(Math.floor(width * percent), width)

    return max > 0 ? character.repeat(max) : ''
  }

  return <Text color={color}>{drawBar()}</Text>
}

export {Bar as default}
