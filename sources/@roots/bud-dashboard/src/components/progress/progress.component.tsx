import {lodash} from '@roots/bud-support'
import React, {useEffect, useState} from 'react'

import {Bar} from './bar'

const {isUndefined, isNumber, isArray} = lodash

/**
 * Progress component
 *
 * @public
 */
export const Progress = ({progress, theme}) => {
  const [display, setDisplay] = useState(false)
  const [number, setNumber] = useState(0)

  useEffect(() => {
    if (
      isUndefined(progress) ||
      !isArray(progress) ||
      isUndefined(progress[0]) ||
      !isNumber(progress[0])
    )
      return

    setNumber(progress[0])
    setDisplay(progress[0] > 0 && progress[0] < 1)
  }, [progress])

  return display ? (
    <Bar
      character={'▮'}
      maxWidth={theme.bounds.width}
      colors={[theme.colors.primary, theme.colors.primaryAlt]}
      percent={number}
    />
  ) : null
}
