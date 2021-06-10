import React, {useState, useEffect} from 'react'
import {Text} from 'ink'
import Gradient from 'ink-gradient'

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
      |{' '}
      <Gradient colors={colors}>
        {character.repeat(fill)}
      </Gradient>
      {'-'.repeat(maxWidth - fill)} |
    </Text>
  )
}
