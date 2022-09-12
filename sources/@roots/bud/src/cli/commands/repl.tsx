import {highlight} from 'cli-highlight'
import {Command, Option} from 'clipanion'
import {Box, Text} from 'ink'
import {UncontrolledTextInput} from 'ink-text-input'
import {format} from 'pretty-format'
import React, {useState} from 'react'

import type Bud from '../../bud.js'
import BaseCommand from './base.js'

/**
 * `bud repl` command
 *
 * @public
 */
export default class ReplCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static paths = [[`repl`]]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    description: `Use bud in a repl`,
    examples: [[`repl`, `$0 repl`]],
  })

  public dry = true

  public notify = false

  public color = Option.Boolean(`--color,-c`, true, {
    description: `use syntax highlighting`,
  })

  public indent = Option.String(`--indent,-i`, `1`, {
    description: `indentation level`,
    tolerateBoolean: false,
  })

  public depth = Option.String(`--depth,-d`, `1`, {
    description: `recursion depth`,
    tolerateBoolean: false,
  })

  /**
   * Command execute
   * @public
   */
  public async runCommand() {
    await this.app.build.make()
    await this.render(
      <Repl app={this.app} indent={this.indent} depth={this.depth} />,
    )
  }
}

interface ReplProps {
  app: Bud
  indent: string
  depth: string
}

const Repl = ({app, indent, depth}: ReplProps) => {
  const [result, setResult] = useState(``)

  const makeFn = (value: string) => eval(`async (bud) => ${value};`)

  const processResults = (raw: unknown) => {
    if (raw === undefined) {
      setResult(`undefined`)
      return
    }

    setResult(
      highlight(
        format(raw, {
          indent: parseInt(indent),
          maxDepth: parseInt(depth),
        }),
      ),
    )
  }

  // @ts-ignore
  const onSubmit = async value => {
    if (!value) return
    setResult(`processing`)

    try {
      const raw = makeFn(value)(app)
      processResults(raw)

      raw.then(async (results: unknown) => {
        processResults(results)
        await app.api.processQueue()
      })
    } catch (err) {}
  }

  return (
    <Box marginBottom={1} flexDirection="column">
      <Box flexDirection="row" justifyContent="flex-start" marginTop={1}>
        <Text>async (bud) {`=> `}</Text>
        <UncontrolledTextInput
          placeholder="app.build.config"
          onSubmit={onSubmit}
        />
      </Box>

      <Box
        flexDirection="column"
        justifyContent="flex-start"
        marginTop={1}
      >
        <Text>{result}</Text>
      </Box>
    </Box>
  )
}
