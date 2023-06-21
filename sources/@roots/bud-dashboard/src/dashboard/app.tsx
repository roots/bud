import {
  Box,
  type PropsWithChildren,
  Spinner,
  Text,
  useApp,
  useInput,
  useState,
  useStdout,
} from '@roots/bud-support/ink'

import {type Props} from './index.js'
import Compilation from './views/compilation.view.js'
import Debug from './views/debug.view.js'
import {Error} from './views/node-error.view.js'
import {Server} from './views/server.view.js'

export const Application = ({
  compilations,
  context,
  debug,
  devUrl,
  displayAssets,
  displayEntrypoints,
  displayServerInfo,
  error,
  mode,
  proxy,
  proxyUrl,
  status,
  watchFiles,
}: Props) => {
  const {stdout} = useStdout()

  if (error) return <Error error={error} />

  return (
    <Box flexDirection="column" gap={1} marginY={1} width={stdout.columns}>
      {status && (
        <Text dimColor wrap="truncate-end">
          <Spinner type="simpleDots" />
          {` `}
          {status}
        </Text>
      )}

      {compilations?.map((compilation, id) => (
        <Box flexDirection="column" gap={1} key={id}>
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
