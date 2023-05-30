import {platform} from 'node:os'

import figures from '@roots/bud-support/figures'
import * as Ink from 'ink'

import Compilation from './compilation/compilation.component.js'
import type {Props} from './index.js'
import Messages from './messages/messages.component.js'
import {Server} from './server/index.js'

const App = ({
  compilations,
  context,
  devUrl,
  proxyUrl,
  displayServerInfo,
  displayAssets,
  displayEntrypoints,
  publicDevUrl,
  publicProxyUrl,
  mode,
  watchFiles = new Set(),
}: Props) => {
  if (!compilations.length)
    return (
      <Ink.Box flexDirection="column">
        <Ink.Text>No compilations</Ink.Text>
      </Ink.Box>
    )

  return (
    <Ink.Box flexDirection="column">
      {platform() === `win32` ? (
        <Ink.Box
          borderColor="red"
          borderStyle="double"
          flexDirection="column"
          padding={1}
        >
          <Ink.Text>🚫 Your OS is not a supported platform</Ink.Text>
          <Ink.Text>{` `}</Ink.Text>
          <Ink.Text>
            You will likely encounter problems.{` `}
            <Ink.Text bold underline>
              Do not make github issues or support requests about Windows
              builds
            </Ink.Text>
            {` `}
            unless you are also submitting accompanying PRs.
          </Ink.Text>
          <Ink.Text>{` `}</Ink.Text>
          <Ink.Text>
            bud.js supports Windows through the Windows Subsystem for Linux
            (WSL): https://learn.microsoft.com/en-us/windows/wsl/install
          </Ink.Text>
        </Ink.Box>
      ) : null}

      {compilations.map((compilation, id) => (
        <Ink.Box key={id} flexDirection="column" paddingBottom={1}>
          {compilation.errors && (
            <Messages
              type="error"
              color="red"
              messages={compilation.errors}
              figure={figures.cross}
            />
          )}

          {compilation.warnings && (
            <Messages
              type="warning"
              color="yellow"
              messages={compilation.warnings}
              figure={figures.warning}
            />
          )}

          <Compilation
            compilation={compilation}
            context={context}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />
        </Ink.Box>
      ))}

      {mode === `development` ? (
        <Ink.Box flexDirection="column" paddingBottom={1}>
          <Server
            devUrl={devUrl}
            publicDevUrl={publicDevUrl}
            proxyUrl={proxyUrl}
            publicProxyUrl={publicProxyUrl}
            watchFiles={watchFiles}
            displayServerInfo={displayServerInfo}
          />
        </Ink.Box>
      ) : null}
    </Ink.Box>
  )
}

export default App
