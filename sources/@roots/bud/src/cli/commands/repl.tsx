import {Command, Option} from '@roots/bud-support/clipanion'
import {chunk} from '@roots/bud-support/lodash-es'
import format from '@roots/bud-support/pretty-format'
import {highlight} from '@roots/bud-support/cli-highlight'

import type Bud from '../../bud.js'
import BaseCommand from './base.js'

let React
let Ink
let TextInput

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

  public log = false

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
    render({app: this.app, indent: this.indent, depth: this.depth})
  }
}

const render = async ({app, indent, depth}) => {
  React = await import(`@roots/bud-support/react`).then(
    ({default: React}) => React,
  )
  TextInput = await import(`@roots/bud-support/ink-text-input`).then(
    ({TextInput}) => TextInput,
  )
  Ink = await import(`@roots/bud-support/ink`)

  Ink.render(<Repl app={app} indent={indent} depth={depth} />)
}

interface ReplProps {
  app: Bud
  indent: string
  depth: string
}

const Repl = ({app, indent, depth}: ReplProps) => {
  const [search, setSearch] = React.useState(``)
  const [result, setResult] = React.useState(``)
  const [paged, setPaged] = React.useState([])
  const [page, setPage] = React.useState(0)

  const pageSize = Math.max(10, 1)

  Ink.useInput((input, key) => {
    if (key.escape) {
      // eslint-disable-next-line
      process.exit()
    }

    if (key.upArrow) {
      page >= 1 ? setPage(page - 1) : setPage(paged.length - 1)
    }

    if (key.downArrow) {
      page < paged.length - 1 ? setPage(page + 1) : setPage(0)
    }

    if (key.return) {
      setSearch(``)
      setResult(``)
      setPaged([])
    }
  })

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
        {ignoreIllegals: true},
      )
      setResult(result)
    } catch (e) {
      setResult(e.message)
    }
  }

  // @ts-ignore
  const onChange = (value: string) => {
    if (!value) return
    setSearch(value)

    try {
      makeFn(value)(app).then(async (results: unknown) => {
        processResults(results)
        await app.api.processQueue()
      })
    } catch (err) {
      setResult(err.message)
    }
  }

  React.useEffect(() => {
    if (result) {
      setPaged(
        chunk<string>(result.split(`\n`), pageSize).map(page =>
          page.join(`\n`),
        ),
      )
    }
  }, [result, pageSize])

  React.useEffect(() => {
    if (page > paged.length) {
      setPage(paged.length - 1)
    }
  }, [page, paged])

  return (
    <Ink.Box marginY={1} flexDirection="column">
      <Ink.Box flexDirection="row" justifyContent="space-between">
        <Ink.Box flexDirection="row" justifyContent="flex-start">
          <Ink.Text>async (bud) {`=> `}</Ink.Text>
          <TextInput value={search} onChange={onChange} />
        </Ink.Box>
        {paged.length > 0 ? (
          <Ink.Box
            flexDirection="row"
            justifyContent="flex-start"
            marginTop={1}
          >
            <Ink.Text>page </Ink.Text>
            <Ink.Text>{page + 1}</Ink.Text>
            <Ink.Text>/</Ink.Text>
            <Ink.Text>{paged.length}</Ink.Text>
          </Ink.Box>
        ) : null}
      </Ink.Box>

      {paged[page] ? (
        <Ink.Box flexDirection="column" justifyContent="flex-start">
          <Ink.Text>{paged[page]}</Ink.Text>
        </Ink.Box>
      ) : null}
    </Ink.Box>
  )
}
