import React, {useEffect, useState, FunctionComponent} from 'react'
import {Box, Text, Spacer} from 'ink'
import Screen from '../UI/Screen'
import useHmr from '../../hooks/useHmr'

interface DevServerProps {
  build: any
}

const DevServer: FunctionComponent<DevServerProps> = ({build}) => {
  const [hmrData] = useHmr()
  const [serverLog, setServerLog] = useState([])
  useEffect(() => {
    build.req && setServerLog([...serverLog, build.req])
  }, [build.req])

  return (
    <Screen title="Development server">
      <Box flexDirection="column" marginBottom={1}>
        {serverLog.length == 0 && (
          <Text color="white" dimColor>
            No requests have been made.
          </Text>
        )}

        {serverLog.map((req, id) => (
          <Box
            flexBasis={1}
            key={id}
            flexDirection="row"
            alignSelf="flex-start"
            alignItems="flex-start"
            justifyContent="flex-start">
            <Text color="green">{req.method} </Text>
            <Spacer />
            <Text color="green" dimColor>
              {req.headers.host}{' '}
            </Text>
            <Spacer />
            <Text color="white">{req.url} </Text>
            <Spacer />
          </Box>
        ))}
      </Box>
    </Screen>
  )
}

export {DevServer as default}
