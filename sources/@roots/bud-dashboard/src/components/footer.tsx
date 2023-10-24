import {Box, Text} from '@roots/bud-support/ink'

export interface Props {
  display?: boolean
}

const Footer = ({display}: Props) => {
  if (!display) {
    return (
      <Box flexDirection="column">
        <Text>{` `}</Text>
        <Text>
          <Text dimColor>{` `}Press</Text> h{` `}
          <Text dimColor>to show help</Text>
        </Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column">
      <Text>{` `}</Text>
      <Text color="blue">
        {` `}Shortcuts{` `}
      </Text>
      <Text>{` `}</Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> b <Text dimColor>to open browser</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> c{` `}
        <Text dimColor>to toggle compact display</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> d{` `}
        <Text dimColor>
          to toggle detailed debug information (may be system intensive)
        </Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> e{` `}
        <Text dimColor>to toggle entrypoints display</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> h <Text dimColor>to hide help</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> q <Text dimColor>to quit</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> r{` `}
        <Text dimColor>to clear/reload console</Text>
      </Text>
      <Text>
        {` `}
        <Text dimColor>Press</Text> s{` `}
        <Text dimColor>to toggle server info display</Text>
      </Text>
    </Box>
  )
}

export default Footer
