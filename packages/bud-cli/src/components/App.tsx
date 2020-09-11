import {Bud} from '@roots/bud-types'
import React, {FunctionComponent, ReactElement} from 'react'
import {useInput, Box, Text} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

interface AppProps {
  bud: Bud
  children:
    | FunctionComponent
    | FunctionComponent[]
    | ReactElement
}

type AppComponent = FunctionComponent<AppProps>

const quit = bud => {
  bud.terminate()
  process.exit()
}

const App: AppComponent = ({bud, children}) => {
  const [width, height] = useStdOutDimensions()

  useInput(input => {
    input == 'q' && quit(bud)
  })

  return (
    <Box
      width={width}
      height={height}
      minHeight={height}
      paddingRight={1}
      paddingBottom={2}
      paddingTop={1}
      flexDirection="column"
      justifyContent="space-between">
      <Box
        paddingLeft={1}
        flexDirection="column"
        justifyContent="flex-start">
        <Text backgroundColor={'#545DD7'} color={'white'}>
          {width > 70 ? '' : ' '}@roots/bud
        </Text>
        {children}
      </Box>
    </Box>
  )
}

export {App as default}
