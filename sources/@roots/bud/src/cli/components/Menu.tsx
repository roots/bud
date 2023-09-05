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
  const [defined] = useState(cli.definitions())
  const [selected, setSelected] = useState(0)
  const [running, setRunning] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(
      defined
        .filter(cmd => cmd.path !== `bud`)
        .reduce((acc, cmd, id) => {
          return [
            ...acc,
            cmd.examples?.map(([description, path]) => {
              return {cmd, description, id, path}
            }).shift(),
          ].filter(Boolean)
        }, []),
    )
  }, [defined])

  useInput((key, input) => {
    if (input.escape) {
      // eslint-disable-next-line n/no-process-exit
      exit()
    }

    if (running) return

    input[`downArrow`] && setSelected(selected + 1)
    input[`upArrow`] && setSelected(selected - 1)

    if (input.return) {
      setRunning(true)
      cli.run(items[selected].path.split(` `).slice(1))
    }
  })

  useEffect(() => {
    if (selected > items.length - 1) setSelected(0)
    if (selected < 0) setSelected(items.length - 1)
  }, [items, selected])

  if (running) return null

  return (
    <Box flexDirection="column" gap={1} marginY={1}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" gap={1}>
          <Text bold>bud.js</Text>
        </Box>
        <Text>v{cli.binaryVersion}</Text>
      </Box>
      <Text italic>{defined[0].description.trim()}</Text>

      <Box flexDirection="column" gap={0}>
        {items.map(({cmd, description, path}, id) => {
          return (
            <Text color={selected === id ? `blue` : `white`} key={id}>
              {selected === id ? figures.radioOn : figures.radioOff}
              {` `}
              {path.trim()}

              <Text color="white" dimColor>
                {` `}
                {description.trim()}
              </Text>
            </Text>
          )
        })}
      </Box>
    </Box>
  )
}
