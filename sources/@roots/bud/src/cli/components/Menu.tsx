import {exit} from 'node:process'

import figures from '@roots/bud-support/figures'
import {
  Box,
  Text,
  useEffect,
  useInput,
  useState,
} from '@roots/bud-support/ink'

import type BudCommand from '../commands/bud.js'

export const Menu = ({cli}: {cli: BudCommand[`cli`]}) => {
  const [defined] = useState(cli.definitions())
  const [selected, setSelected] = useState(0)
  const [running, setRunning] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(
      defined.reduce((acc, cmd, id) => {
        return [
          ...acc,
          ...(cmd.examples ?? []).map(([description, path]) => {
            return {cmd, description, id, path}
          }),
        ]
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

  return (
    <Box flexDirection="column" gap={1} marginY={1}>
      <Text bold>bud.js (v{cli.binaryVersion})</Text>
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
