import {Box, type ReactNode, Text} from '@roots/bud-support/ink'

interface Props {
  children?: Array<ReactNode> | ReactNode
  color?: string
  flexDirection?: 'column' | 'row'
  label?: string
  value?: string
}

export const LabelBox = ({children, color, flexDirection, label, value}: Props) => {
  if (!label && !children && !value) return null

  return (
    <Box flexDirection={flexDirection ?? `column`} gap={1}>
      {label && <Text color={color ?? `blue`}>{label}</Text>}

      {children ? (
        <Box flexDirection="column">{children}</Box>
      ) : value ? <Text>{value}</Text> :  (
        <Box>
          <Text>No results to display</Text>
        </Box>
      )}
    </Box>
  )
}
