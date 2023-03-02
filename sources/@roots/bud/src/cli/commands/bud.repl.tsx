import {dry} from '@roots/bud/cli/decorators'
import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import {highlight} from '@roots/bud-support/highlight'
import Ink from '@roots/bud-support/ink'
import {TextInput} from '@roots/bud-support/ink-text-input'
import chunk from '@roots/bud-support/lodash/chunk'
import format from '@roots/bud-support/pretty-format'
import {useEffect, useState} from '@roots/bud-support/react'
import React from '@roots/bud-support/react'

import BudCommand, {ArgsModifier} from './bud.js'

/**
 * `bud repl`
 */
@dry
export default class BudReplCommand extends BudCommand {
  public static override paths = [[`repl`]]
  public static override usage = Command.Usage({
    description: `Use bud in a repl`,
    examples: [[`repl`, `$0 repl`]],
  })
  public override withArguments = ArgsModifier({dry: true})

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
   * Execute command
   */
  @bind
  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    await this.render(
      <Repl app={this.bud} indent={this.indent} depth={this.depth} />,
    )
  }
}

interface ReplProps {
  app: Bud
  indent: string
  depth: string
}

const Repl = ({app, indent, depth}: ReplProps) => {
  const [search, setSearch] = useState(``)
  const [result, setResult] = useState(``)
  const [paged, setPaged] = useState([])
  const [page, setPage] = useState(0)
  const [action, setAction] = useState(``)

  const pageSize = 10

  Ink.useInput((input, key) => {
    if (key.escape) {
      // eslint-disable-next-line
      process.exit(0)
    }

    if (key.upArrow) {
      setAction(`up`)
      page >= 1 ? setPage(page - 1) : setPage(paged.length - 1)
    }

    if (key.downArrow) {
      setAction(`down`)
      page < paged.length - 1 ? setPage(page + 1) : setPage(0)
    }

    if (key.tab) {
      setAction(`tab`)
      setSearch(``)
    }

    if (key.return) {
      setAction(`return`)
      setResult(``)
      setPaged([])
      setPage(0)
    }
  })

  useEffect(() => {
    action !== `` &&
      setTimeout(() => {
        setAction(``)
      }, 500)
  }, [action])

  useEffect(() => {
    if (result) {
      setPaged(
        chunk<string>(result.split(`\n`), pageSize).map(page =>
          page.join(`\n`),
        ),
      )
    }
  }, [result, pageSize])

  useEffect(() => {
    if (page > paged.length) {
      setPage(paged.length - 1)
    }
  }, [page, paged])

  const makeFn = (value: string) => eval(`async (bud) => ${value};`)

  const processResults = (raw: unknown) => {
    if (raw === undefined) {
      setResult(`undefined`)
      return
    }

    try {
      const result = highlight(
        format(raw, {
          indent: parseInt(indent),
          maxDepth: parseInt(depth),
        }),
      )
      setResult(result)
    } catch (e) {
      setResult(e.message)
    }
  }

  const onSubmit = (value: string) => {
    ;(async () => {
      try {
        const fn = makeFn(value)
        const results = await fn(app)
        processResults(results)
        await app.api.processQueue()
      } catch (err) {
        setResult(err.message)
      }
    })()
  }

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box marginY={1} flexDirection="column">
        <Ink.Box flexDirection="row" justifyContent="space-between">
          <Ink.Box flexDirection="row" justifyContent="flex-start">
            <TextInput
              placeholder="bud.build.config.entry"
              value={search}
              onChange={setSearch}
              onSubmit={onSubmit}
            />
          </Ink.Box>

          {paged.length > 0 ? (
            <Ink.Box
              flexDirection="row"
              justifyContent="flex-start"
              marginTop={1}
            >
              <Ink.Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                page{` `}
              </Ink.Text>
              <Ink.Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                {page + 1}
              </Ink.Text>
              <Ink.Text>/</Ink.Text>
              <Ink.Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                {paged.length}
              </Ink.Text>
            </Ink.Box>
          ) : null}
        </Ink.Box>

        {paged[page] ? (
          <Ink.Box flexDirection="column" justifyContent="flex-start">
            <Ink.Text>{paged[page]}</Ink.Text>
          </Ink.Box>
        ) : null}
      </Ink.Box>
      <Ink.Box marginY={1} flexDirection="row">
        <Ink.Text>
          <Ink.Text
            backgroundColor={action === `esc` ? `green` : `white`}
            color="black"
          >
            [esc]
          </Ink.Text>
          {` `}quit
        </Ink.Text>
        <Ink.Text>{`  `}</Ink.Text>
        <Ink.Text>
          <Ink.Text
            backgroundColor={action === `tab` ? `green` : `white`}
            color="black"
          >
            [tab]
          </Ink.Text>
          {` `}clear
        </Ink.Text>
        <Ink.Text>{`  `}</Ink.Text>
        <Ink.Text>
          <Ink.Text
            backgroundColor={action === `down` ? `green` : `white`}
            color="black"
          >
            [↓]
          </Ink.Text>
          {` `}next
        </Ink.Text>
        <Ink.Text>{`  `}</Ink.Text>
        <Ink.Text>
          <Ink.Text
            backgroundColor={action === `up` ? `green` : `white`}
            color="black"
          >
            [↑]
          </Ink.Text>
          {` `}prev
        </Ink.Text>
        <Ink.Text>{`  `}</Ink.Text>
        <Ink.Text>
          <Ink.Text
            backgroundColor={action === `return` ? `green` : `white`}
            color="black"
          >
            [return]
          </Ink.Text>
          {` `}eval
        </Ink.Text>
      </Ink.Box>
    </Ink.Box>
  )
}
