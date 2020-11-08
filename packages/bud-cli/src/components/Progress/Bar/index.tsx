import React from 'react'
import {Text} from 'ink'

declare namespace Bar {
  export interface Props {
    color?: string
    backgroundColor?: string
    percent: number
    character?: string
    maxWidth?: number
  }

  export type Component = React.FunctionComponent<Props>
}

const Bar: Bar.Component = ({
  color = 'white',
  percent,
  backgroundColor = 'transparent',
  character = '\u2588',
  maxWidth,
}: Bar.Props) =>
  percent <= 0 ? null : (
    <Text backgroundColor={backgroundColor} color={color}>
      {character.repeat(
        Math.min(Math.floor(maxWidth * percent), maxWidth),
      )}
    </Text>
  )

export {Bar, Bar as default}
