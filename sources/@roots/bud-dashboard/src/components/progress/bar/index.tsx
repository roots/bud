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
  width: number
  character?: string
  maxWidth?: number
}> = ({character, colors, width, maxWidth}) => {
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const valid = typeof maxWidth == 'number' && typeof width == 'number'

    const lower = valid ? maxWidth : 0
    const chars = valid ? width : 0
    const upper = Math.ceil(lower * chars)

    setFill(Math.min(lower, upper))
  }, [maxWidth, width])

  if (!isNumber(fill) || fill <= 0 || fill >= maxWidth) return null

  return (
    <Text wrap="truncate">
      <Gradient colors={colors}>{character.repeat(fill) ?? ''}</Gradient>
      {character.repeat(maxWidth - fill) ?? ''}
      <Newline />
    </Text>
  )
}
