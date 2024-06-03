import type BudCommand from '@roots/bud/cli/commands'

import {exit} from 'node:process'

import figures from '@roots/bud-support/figures'
import {
  Box,
  Text,
  useEffect,
  useInput,
  useState,
} from '@roots/bud-support/ink'

export const Menu = ({cli}: {cli: BudCommand[`cli`]}) => {
  const [selected, setSelected] = useState(0)

  const defined = cli.definitions()
  const items = defined.filter(cmd => cmd.path !== `bud`)
  const description = defined[0].description.trim()

  const longestCommandLength = items.reduce((a, b) => {
    return a.path.length > b.path.length ? a : b
  }).path.length

  useInput((_, input) => {
    input.escape && exit()

    input.downArrow && setSelected(selected + 1)
    input.upArrow && setSelected(selected - 1)

    if (input.return) {
      cli.run(items[selected].path.split(` `).slice(1))
    }
  })

  useEffect(() => {
    if (selected > items.length - 1) setSelected(0)
    if (selected < 0) setSelected(items.length - 1)
  }, [items, selected])

  return (
    <Box flexDirection="column" gap={1} marginY={1}>
      <Header />

      <Text italic>{description}</Text>

      <Box flexDirection="column" gap={0}>
        {items.map(({description, path}, id) => (
          <Item
            description={description}
            key={id}
            minWidth={longestCommandLength}
            path={path}
            selected={selected === id}
          />
        ))}
      </Box>
    </Box>
  )
}

const Header = () => (
  <Box flexDirection="row" justifyContent="space-between">
    <Box flexDirection="row" gap={1}>
      <Text bold>bud.js</Text>
    </Box>
  </Box>
)

const Item = ({
  description,
  minWidth,
  path,
  selected,
}: {
  description?: string
  minWidth: number
  path: string
  selected: boolean
}) => {
  const color = selected ? `blue` : `white`
  const figure = selected ? figures.radioOn : figures.radioOff

  return (
    <Box flexDirection="row" gap={2}>
      <Box>
        <Text color={color}>{figure}</Text>
      </Box>
      <Box width={minWidth}>
        <Text color={color}>{path.trim()}</Text>
      </Box>
      <Box>
        <Text color="white" dimColor>
          {description.trim()}
        </Text>
      </Box>
    </Box>
  )
}
