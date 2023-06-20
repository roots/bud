import {
  Box,
  Gradient,
  type PropsWithChildren,
  Spinner,
  Text,
  useApp,
  useInput,
  useState,
} from '@roots/bud-support/ink'

import Messages from './components/messages.component.js'
import {type Props} from './index.js'
import Compilation from './views/compilation.view.js'
import Debug from './views/debug.view.js'
import {Server} from './views/server.view.js'

export const Application = ({
  compilations,
  context,
  debug,
  devUrl,
  displayAssets,
  displayEntrypoints,
  displayServerInfo,
  mode,
  proxy,
  proxyUrl,
  status,
  watchFiles,
}: Props) => {
  return (
    <Box flexDirection="column" gap={1} marginTop={1} width="100%">
      {status && (
        <Text wrap="truncate-end">
          <Gradient name="cristal">
            <Spinner type="simpleDots" />
            {` `}
            {status}
          </Gradient>
        </Text>
      )}

      {compilations?.map((compilation, id) => (
        <Box flexDirection="column" gap={1} key={id}>
          <Messages color="red" messages={compilation.errors} />
          <Messages color="yellow" messages={compilation.warnings} />

          <Compilation
            compilation={compilation}
            context={context}
            debug={debug}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />

          <Debug compilation={compilation} debug={debug} />
        </Box>
      ))}

      <Server
        devUrl={devUrl}
        displayServerInfo={displayServerInfo && compilations?.length > 0}
        mode={mode}
        proxy={proxy}
        proxyUrl={proxyUrl}
        watchFiles={watchFiles}
      />
    </Box>
  )
}

export const TeletypeApplication = ({
  children,
  close,
  ...props
}: PropsWithChildren<Props>) => {
  const app = useApp()

  const [displayServerInfo, setDisplayServerInfo] = useState(
    props.displayServerInfo,
  )
  const [debug, setDisplayDebug] = useState(props.debug)
  const [displayEntrypoints, setDisplayEntrypoints] = useState(true)
  const [displayAssets, setDisplayAssets] = useState(true)
  const [closed, setClosed] = useState(false)

  useInput((key, input) => {
    key === `a` && setDisplayAssets(!displayAssets)
    key === `e` && setDisplayEntrypoints(!displayEntrypoints)
    key === `d` && setDisplayDebug(!debug)
    key === `s` && setDisplayServerInfo(!displayServerInfo)

    if (input.escape) {
      setClosed(true)
      close((error?) => {
        app.exit(error)
        // eslint-disable-next-line n/no-process-exit
        process.exit(error ? 1 : 0)
      })
    }
  })

  return (
    <Application
      {...props}
      closed={closed}
      debug={debug}
      displayAssets={displayAssets}
      displayEntrypoints={displayEntrypoints}
      displayServerInfo={displayServerInfo}
    />
  )
}
