import {platform} from 'node:os'

import {Error} from '@roots/bud-dashboard/components/error'
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

export const Doctor = ({name, timings}) => {
  return (
    <Box flexDirection="column" gap={1} marginTop={1}>
      <Text bold>{name}</Text>
      <Text italic>
        {`Completed a dry run of your project's build (executed in ${timings.build} seconds). If the information provided by this command doesn't yield a solution consider running \`yarn bud repl\` and exploring the finalized config (\`bud.build.config\`).`}
      </Text>

      <Process />
    </Box>
  )
}

const Process = () => {
  const nodeGood = process.version.match(/^v20/)
  const nodeWarn = process.version.match(/^v[17|18|19]/)

  const nodeColor = nodeGood ? `green` : nodeWarn ? `yellow` : `red`
  const nodeFigure = nodeGood
    ? figures.tick
    : nodeWarn
    ? figures.warning
    : figures.cross

  const os = {
    platform: platform(),
    color: `yellow`,
    figure: figures.warning,
  }

  if (os.platform !== `win32`) {
    os.color = `green`
    os.figure = figures.tick
  }

  return (
    <Box flexDirection="column" gap={1}>
      <Text color="blue">System requirements</Text>

      <Box flexDirection="column">
        <Box flexDirection="row" gap={1}>
          <Text color={nodeColor}>
            {nodeFigure}
            {` `}node:
          </Text>

          <Text>{process.version}</Text>
        </Box>

        <Box flexDirection="row" gap={1}>
          <Text color={os.color}>
            {os.figure}
            {` `}os:
          </Text>

          <Text>{os.platform}</Text>
        </Box>
      </Box>

      {nodeWarn && (
        <Box flexDirection="column" gap={1}>
          <Text bold color="yellow">
            Warning
          </Text>

          <Text>
            Please upgrade to Node v18 for long-term support. You are
            running node {process.version}.
          </Text>
        </Box>
      )}

      {!nodeGood && !nodeWarn && (
        <Error
          error={
            new BudError(`node-version`, {
              details: `Please upgrade to Node v18 for long-term support. You are running node ${process.version}.`,
              docs: new URL(`https://bud.js.org/learn/getting-started`),
            })
          }
        />
      )}
    </Box>
  )
}
