import React from 'react'
import {Text} from 'ink'
import Gradient from 'ink-gradient'

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
  maxWidth,
}: Bar.Props) => {
  const fill = Math.min(Math.floor(maxWidth * percent), maxWidth)

  const background = maxWidth - fill

  return percent <= 0 ? null : (
    <Text>
      <Gradient colors={[color, '#663399']}>
        {'█'.repeat(fill)}
      </Gradient>

      <Text backgroundColor="white" dimColor>
        {'░'.repeat(background)}
      </Text>
    </Text>
  )
}

export {Bar, Bar as default}
