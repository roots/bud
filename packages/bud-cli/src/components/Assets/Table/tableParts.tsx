import {React, Text} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

export const cell = ({children}) => {
  const {colors} = useStyle()

  return (
    <Text bold color={colors.white}>
      {children.toString().includes('✓') ? (
        <Text color={colors.success}>{children}</Text>
      ) : (
        children
      )}
    </Text>
  )
}

export const skeleton = ({children}) => {
  const {colors} = useStyle()

  return (
    <Text dimColor={true} color={colors.faded}>
      {children}
    </Text>
  )
}
