import {lodash} from '@roots/bud-support'
import {Newline, Text} from 'ink'
import Gradient from 'ink-gradient'
import React, {useEffect, useState} from 'react'

const {isNumber} = lodash

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
    const upper = Math.ceil(lower * chars)

    setFill(Math.min(lower, upper))
  }, [maxWidth, percent])

  if (!isNumber(fill) || fill <= 0) {
    return null
  }

  return (
    <Text wrap="truncate">
      <Gradient colors={colors}>
        {character.repeat(fill) ?? ''}
      </Gradient>

      {character.repeat(maxWidth - fill) ?? ''}

      <Newline />
    </Text>
  )
}
