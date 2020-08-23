import React, {FunctionComponent} from 'react'
import {Text} from 'ink'

interface BarProps {
  percent: number
  columns?: number
  left?: number
  right?: number
  character?: string
  rightPad?: number
}
type BarComponent = FunctionComponent<BarProps>

const Bar: BarComponent = ({
  percent,
  character = '█',
  columns,
  left,
  right,
  rightPad,
}) => {
  const getString = () => {
    const screen = columns || process.stdout.columns || 80
    const space = screen - right - left
    const max = Math.min(Math.floor(space * percent), space)
    const chars = character.repeat(max)

    if (!rightPad) {
      return chars
    }

    return chars + ' '.repeat(space - max)
  }

  return <Text>{getString()}</Text>
}

export {Bar}
