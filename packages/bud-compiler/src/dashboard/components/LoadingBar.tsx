import React, {FunctionComponent} from 'react'
import {Text} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

interface BarProps {
  color?: string
  backgroundColor?: string
  percent: number
  columns?: number
  left?: number
  right?: number
  character?: string
  rightPad?: number
}
type BarComponent = FunctionComponent<BarProps>

const Bar: BarComponent = ({
  color = 'green',
  backgroundColor = 'white',
  percent,
  character = '█',
  columns,
}) => {
  const [width] = useStdOutDimensions()

  const getString = () => {
    const screen = columns || width - 8
    const max = Math.min(Math.floor(screen * percent), screen)
    const chars = character.repeat(max)

    return chars + ' '.repeat(screen - max)
  }

  return (
    <Text backgroundColor={backgroundColor} color={color}>
      {getString()}
    </Text>
  )
}

export {Bar}
