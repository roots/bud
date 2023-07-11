import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

export interface Props {
  borderColor?: string
  children?: any
  compact?: boolean
  footer?: any
  head?: any
  paddingY?: number
}

const View = ({
  borderColor = `dim`,
  children,
  compact,
  footer,
  head,
  paddingY = 0,
}: Props) => {
  return (
    <Box flexDirection="column" overflowX="hidden" width="100%">
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={1}>
          <Text color={borderColor}>{figures.lineDownRightArc}</Text>
        </Box>
        {head}
      </Box>

      {!compact && (
        <Box
          borderBottom={false}
          borderColor={borderColor}
          borderLeft={true}
          borderRight={false}
          borderStyle="single"
          borderTop={false}
          flexDirection="column"
          gap={1}
          overflowX="hidden"
          paddingBottom={paddingY}
          paddingLeft={1}
          paddingTop={paddingY}
          width="100%"
        >
          {children}
        </Box>
      )}

      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={1}>
          <Text color={borderColor}>{figures.lineUpRightArc}</Text>
        </Box>

        {footer}
      </Box>
    </Box>
  )
}

export default View
