import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

const View = ({children, footer, head}) => {
  return (
    <Box flexDirection="column" overflowX="hidden" width="100%">
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={2}>
          <Text dimColor>{figures.lineDownRightArc}</Text>
          <Text dimColor>{figures.line}</Text>
        </Box>

        {head}
      </Box>

      <Box
        borderBottom={false}
        borderColor="dim"
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

      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Box flexDirection="row" gap={0} minWidth={2}>
          <Text dimColor>{figures.lineUpRightArc}</Text>
          <Text dimColor>{figures.line}</Text>
        </Box>

        {footer}
      </Box>
    </Box>
  )
}

export default View
