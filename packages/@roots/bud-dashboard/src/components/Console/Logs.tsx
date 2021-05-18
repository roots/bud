import React from 'react'
import {Box, Text, Static} from 'ink'

export const Logs = ({logs}) => (
  <Box marginBottom={1} flexDirection="column">
    <Static items={logs}>
      {(log, id) => (
        <Box key={id} marginBottom={1} flexDirection="column">
          <Box>
            <Text>{log}</Text>
          </Box>
        </Box>
      )}
    </Static>
  </Box>
)
