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
  const nodeGood = process.version.match(/v1[7|8|9]/)
  const nodeWarn = process.version.match(/v16/)
  const nodeBad = !nodeGood && !nodeWarn

  const nodeColor = nodeGood ? `green` : nodeWarn ? `yellow` : `red`
  const nodeFigure = nodeGood
    ? figures.tick
    : nodeWarn
    ? figures.warning
    : figures.cross

  const os = platform()
  const isWin = os === `win32`
  const osGood = !isWin
  const osColor = osGood ? `green` : `red`
  const osFigure = osGood ? figures.tick : figures.cross

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
          <Text color={osColor}>
            {osFigure}
            {` `}os:
          </Text>

          <Text>{os}</Text>
        </Box>
      </Box>

      {nodeWarn && (
        <Box flexDirection="column" gap={1}>
          <Text bold color="yellow">
            Warning
          </Text>

          <Text>
            Please upgrade to Node v18 for long-term support. You are
            running node ${process.version}.
          </Text>
        </Box>
      )}

      {nodeBad && (
        <Error
          error={
            new BudError(`node-version`, {
              props: {
                details: `Please upgrade to Node v18 for long-term support. You are running node ${process.version}.`,
                docs: new URL(`https://bud.js.org/guides/getting-started`),
              },
            })
          }
        />
      )}
    </Box>
  )
}
