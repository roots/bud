import {Box} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import ConsoleBuffer from './index.js'

export const Log = ({
  messages,
}: {
  messages: {stdout: Array<string>; stderr: Array<string>}
}) => (
  <Box flexDirection="column">
    {messages?.stderr && (
      <ConsoleBuffer
        label="stderr"
        color="red"
        messages={messages.stderr}
      />
    )}

    {messages?.stdout && (
      <ConsoleBuffer
        label="stdout"
        color="green"
        messages={messages.stdout}
      />
    )}
  </Box>
)
