import React, {FunctionComponent} from 'react'
import {Text} from 'ink'

interface BarProps {
  color?: string
  backgroundColor?: string
  percent: number
  character?: string
  maxWidth?: number
}

type BarComponent = FunctionComponent<BarProps>

const Bar: BarComponent = ({
  color = 'white',
  percent,
  backgroundColor = 'transparent',
  character = '\u2588',
  maxWidth,
}) =>
  percent <= 0 ? null : (
    <Text backgroundColor={backgroundColor} color={color}>
      {character.repeat(
        Math.min(Math.floor(maxWidth * percent), maxWidth),
      )}
    </Text>
  )

export {Bar as default}
