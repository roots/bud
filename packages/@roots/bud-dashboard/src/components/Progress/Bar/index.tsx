import {Text} from 'ink'
import InkGradient from 'ink-gradient'
import React, {useEffect, useState} from 'react'

/**
 * Bar component
 *
 * @public
 */
export const Bar: React.FunctionComponent<{
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
      <InkGradient colors={colors}>
        {character.repeat(fill) ?? ''}
      </InkGradient>
      {'▉'.repeat(maxWidth - fill) ?? ''}
    </Text>
  )
}
