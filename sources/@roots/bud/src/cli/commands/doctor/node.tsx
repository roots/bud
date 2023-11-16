import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

const color = {
  fail: `red`,
  success: `green`,
  warn: `yellow`,
}
const figure = {
  fail: figures.cross,
  success: figures.tick,
  warn: figures.warning,
}

const getColor = (state: `fail` | `success` | `warn`) => color[state]

const getFigure = (state: `fail` | `success` | `warn`) => figure[state]

export const Node = () => {
  let nodeState: `fail` | `success` | `warn` = `success`

  const major = Number(process.version.match(/^v(\d\d)/)?.[1] ?? 0)
  if (major < 18) nodeState = `fail`
  if (major < 20) nodeState = `warn`

  return (
    <LabelBox flexDirection="row" label="Node">
      <Box flexDirection="row" gap={1}>
        <Text color={getColor(nodeState)}>{getFigure(nodeState)}</Text>
        <Text>{process.version}</Text>
      </Box>

      {nodeState === `warn` && (
        <Text>
          Please upgrade to Node v20 for long-term support. You are running
          node {process.version}.
        </Text>
      )}

      {nodeState === `fail` && (
        <Text>
          Please upgrade to Node v20 for long-term support. You are running
          node {process.version}.
        </Text>
      )}
    </LabelBox>
  )
}
