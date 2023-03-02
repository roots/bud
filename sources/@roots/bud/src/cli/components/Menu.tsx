import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import type BudCommand from '../commands/bud.js'

const options: Array<[string, string, Array<string>]> = [
  [
    `build production`,
    `build application for production`,
    [`build`, `production`],
  ],
  [
    `build development`,
    `start development server`,
    [`build`, `development`],
  ],
  [
    `doctor`,
    `check bud.js configuration for common errors and issues`,
    [`doctor`],
  ],
  [
    `repl`,
    `open a repl to explore bud just prior to compilation`,
    [`repl`],
  ],
  [
    `upgrade`,
    `upgrade bud.js and extensions to the latest stable version`,
    [`upgrade`],
  ],
]

export const Menu = ({cli}: {cli: BudCommand[`cli`]}) => {
  const [selected, setSelected] = React.useState(0)
  const [running, setRunning] = React.useState(false)

  Ink.useInput((key, input) => {
    if (running) return

    input[`downArrow`] && setSelected(selected + 1)
    input[`upArrow`] && setSelected(selected - 1)

    if (input.escape) {
      // eslint-disable-next-line n/no-process-exit
      process.exit(0)
    }

    if (input.return) {
      setRunning(true)
      cli.run(options[selected][2])
    }
  })

  React.useEffect(() => {
    if (selected > options.length - 1) setSelected(0)
    if (selected < 0) setSelected(options.length - 1)
  }, [selected])

  return (
    <Ink.Box flexDirection="column" marginTop={1}>
      {options.map(([option, description, command], index) => {
        return (
          <Ink.Text
            key={index}
            color={selected === index ? `blue` : `white`}
          >
            {selected === index ? figures.radioOn : figures.radioOff}
            {`  `}
            {option}
            <Ink.Text color="white" dimColor>
              {` `}
              {description}
            </Ink.Text>
          </Ink.Text>
        )
      })}
    </Ink.Box>
  )
}
