import {Styles} from '@roots/ink-use-style'
import {Text} from 'ink'
import React from 'react'

export interface Props {
  message: string
  file?: string
  colors: [keyof Styles['colors'], keyof Styles['colors']]
  icon: string
}

export const Message = ({message, icon, colors}: Props) => {
  return (
    <Text>
      <Text color={`${colors[0]}`}>{icon ?? ''}</Text>{' '}
      {(message.startsWith('\n') ? message.slice(1) : message).replace(
        process.cwd(),
        '.',
      )}
    </Text>
  )
}
