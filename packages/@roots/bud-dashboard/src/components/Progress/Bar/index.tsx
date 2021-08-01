import {Text} from 'ink'
import * as Gradient from 'ink-gradient'
import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'

export const Bar: FunctionComponent<{
  colors?: string[]
  percent: number
  character?: string
  maxWidth?: number
}> = ({character, colors, percent, maxWidth}) => {
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const valid =
      typeof maxWidth == 'number' && typeof percent == 'number'

    const lower = valid ? maxWidth : 0
    const chars = valid ? percent : 0
    const upper = Math.floor(lower * chars)

    setFill(Math.min(lower, upper))
  }, [maxWidth, percent])

  return fill <= 0 ? null : (
    <Text wrap="truncate">
      <Gradient colors={colors}>
        {character.repeat(fill)}
      </Gradient>
      {'▉'.repeat(maxWidth - fill)}
    </Text>
  )
}
