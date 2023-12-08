import {
  Box,
  type BoxProps,
  type ReactNode,
  Text,
} from '@roots/bud-support/ink'

interface Props extends BoxProps {
  children?: Array<ReactNode> | ReactNode
  color?: string
  contentFlexDirection?: `column` | `row`
  label?: string
  value?: string
}

export const LabelBox = ({
  children,
  color,
  contentFlexDirection,
  label,
  value,
  ...props
}: Props) => {
  if (!label && !children && !value) return null

  return (
    <Box
      flexDirection={props?.flexDirection ?? `column`}
      gap={props.gap ?? 1}
      {...props}
    >
      {label && <Text color={color ?? `blue`}>{label}</Text>}

      {children ? (
        <Box flexDirection={contentFlexDirection ?? `column`}>
          {children}
        </Box>
      ) : value ? (
        <Text>{value}</Text>
      ) : (
        <Box>
          <Text>No results to display</Text>
        </Box>
      )}
    </Box>
  )
}
