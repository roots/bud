import {Box, Text, React} from '@roots/bud-support'

declare interface Props {
  children: any
  label: string
  when?: boolean
  fallback?: any
  color?: string
  labelColor?: string
  marginBottom?: number
  borderStyle?: 'single' | 'double' | 'classic' | 'round'
}

export const Module: React.FunctionComponent<Props> = ({
  children,
  label,
  when = true,
  fallback = null,
  color = 'white',
  labelColor = color,
  marginBottom = 1,
  borderStyle = 'single',
}) =>
  when ? (
    <Box flexDirection="column" marginBottom={marginBottom}>
      <Text color={labelColor}>{label}</Text>
      <Box
        borderStyle={borderStyle}
        borderColor={color}
        paddingX={1}
        flexDirection="column">
        {children}
      </Box>
    </Box>
  ) : (
    fallback
  )
