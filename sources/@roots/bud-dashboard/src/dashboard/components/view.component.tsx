import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

const View = ({
  borderColor = `dim`,
  children,
  collapsed,
  footer,
  head,
}: {
  borderColor?: string
  children?: any
  collapsed?: boolean
  footer?: any
  head?: any
}) => {
  const showInner = !collapsed && children
  return (
    <Box flexDirection="column" overflowX="hidden" width="100%">
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={2}>
          <Text color={borderColor}>{figures.lineDownRightArc}</Text>
          <Text color={borderColor}>{figures.line}</Text>
        </Box>
        {head}
      </Box>

      {showInner && (
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
          paddingBottom={1}
          paddingLeft={1}
          paddingTop={1}
          width="100%"
        >
          {children}
        </Box>
      )}

      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={2}>
          <Text color={borderColor}>{figures.lineUpRightArc}</Text>
          <Text color={borderColor}>{figures.line}</Text>
        </Box>

        {footer}
      </Box>
    </Box>
  )
}

export default View
