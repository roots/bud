import {Text} from 'ink'
import React from 'react'

/**
 * URL component
 *
 * @public
 */
export const Url = ({value, label}) => {
  return (
    <Text>
      [{label}] {value.origin}
    </Text>
  )
}
