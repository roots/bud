const React = require('react')
const {Box, Spacer, Text, render} = require('ink')
const useStdOutDimensions = require('ink-use-stdout-dimensions')

/**
 * Bud-CLI
 */
const App = props => {
  const [width, height] = useStdOutDimensions()
  const dimensions = {
    width,
    height: height - 5,
  }

  return (
    <Box
      width={dimensions.width}
      maxWidth={dimensions.width}
      minHeight={dimensions.height}
      textWrap="truncate"
      paddingRight={1}
      paddingBottom={1}
      paddingTop={1}
      flexDirection="column">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={1}>
        <Box>
          <Text color={'#545DD7'}>@roots/bud-scripts</Text>
        </Box>
      </Box>
    </Box>
  )
}

/** 🚀 */
render(<App />)
