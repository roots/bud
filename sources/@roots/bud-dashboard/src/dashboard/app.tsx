import {
  Box,
  Fragment,
  type PropsWithChildren,
  Spinner,
  Text,
  useApp,
  useInput,
  useState,
} from '@roots/bud-support/ink'
import {exit, stdout} from 'node:process'

import {type Props} from './index.js'
import Compilation from './views/compilation.view.js'
import Debug from './views/debug.view.js'
import {Error} from './views/node-error.view.js'
import {Server} from './views/server.view.js'

export const Application = ({
  collapsed,
  compilations,
  context,
  debug,
  devUrl,
  displayAssets,
  displayEntrypoints,
  displayServerInfo,
  error,
  isolated = 0,
  mode,
  proxy,
  proxyUrl,
  status,
}: Props) => {
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

      {compilations?.map((compilation, id) => {
        if (isolated > 0 && id + 1 !== isolated)
          return <Fragment key={id}></Fragment>

        return (
          <Box flexDirection="column" gap={1} key={id}>
            <Compilation
              collapsed={collapsed}
              compilation={compilation}
              context={context}
              debug={debug}
              displayAssets={displayAssets}
              displayEntrypoints={displayEntrypoints}
              id={id + 1}
              total={compilations.length}
            />
            <Debug compilation={compilation} debug={debug} />
          </Box>
        )
      })}

      <Server
        devUrl={devUrl}
        displayServerInfo={displayServerInfo && compilations?.length > 0}
        mode={mode}
        proxy={proxy}
        proxyUrl={proxyUrl}
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
  const [displayAssets, setDisplayAssets] = useState(props.displayAssets)
  const [closed, setClosed] = useState(false)
  const [collapsed, setCollapsed] = useState(props.collapsed)
  const [isolated, setIsolated] = useState(0)

  useInput((key, input) => {
    key === `a` && setDisplayAssets(!displayAssets)
    key === `e` && setDisplayEntrypoints(!displayEntrypoints)
    key === `d` && setDisplayDebug(!debug)
    key === `s` && setDisplayServerInfo(!displayServerInfo)
    key === `c` && setCollapsed(!collapsed)
    key === `0` && setIsolated(0)

    new Array(9)
      .fill(0)
      .forEach(
        (_, i) =>
          key === `${i + 1}` &&
          isolated !== i + 1 &&
          setIsolated(Math.min(i + 1, props.compilations.length)),
      )

    if (input.escape) {
      setClosed(true)
      close((error?) => {
        app.exit(error)
        exit(error ? 1 : 0)
      })
    }
  })

  return (
    <Application
      {...props}
      closed={closed}
      collapsed={collapsed}
      debug={debug}
      displayAssets={displayAssets}
      displayEntrypoints={displayEntrypoints}
      displayServerInfo={displayServerInfo}
      isolated={isolated}
    />
  )
}
