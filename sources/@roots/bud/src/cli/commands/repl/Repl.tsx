import type {Bud} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'
import {highlight} from '@roots/bud-support/highlight'
import {
  Box,
  Text,
  TextInput,
  useEffect,
  useInput,
  useState,
} from '@roots/bud-support/ink'
import chunk from '@roots/bud-support/lodash/chunk'
import format from '@roots/bud-support/pretty-format'

interface ReplProps {
  app: Bud
  depth: string
  indent: string
}

export const Repl = ({app, depth, indent}: ReplProps) => {
  const [search, setSearch] = useState(``)
  const [result, setResult] = useState(``)
  const [paged, setPaged] = useState<Array<string>>([])
  const [page, setPage] = useState<number>(0)
  const [action, setAction] = useState(``)

  const pageSize = Math.max(process.stdout.rows - 7, 10)

  useInput((input, key) => {
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

    if (
      !key.return &&
      !key.tab &&
      !key.downArrow &&
      !key.upArrow &&
      !key.escape
    ) {
      setAction(`alpha`)
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
      const page = chunk(result.split(`\n`), pageSize).map(page =>
        page.join(`\n`),
      )
      setPaged(page)
    }
  }, [result, pageSize])

  useEffect(() => {
    if (page > paged.length) {
      setPage(Math.max(paged.length - 1, 0))
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
    } catch (error) {
      setResult(BudError.normalize(error).message)
    }
  }

  const onSubmit = (value: string) => {
    ;(async () => {
      try {
        const fn = makeFn(value)
        const results = await fn(app)

        await app.build.make()
        if (app.hasChildren)
          await Promise.all(
            Object.entries(app.children).map(
              async ([_, child]) => await child.build.make(),
            ),
          )
        processResults(results)
      } catch (error) {
        setResult(BudError.normalize(error).message)
      }
    })()
  }

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" marginY={1}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box
            borderBottom={false}
            borderLeft={true}
            borderLeftColor={action === `alpha` ? `green` : `dim`}
            borderRight={false}
            borderStyle="single"
            borderTop={false}
            flexDirection="row"
            justifyContent="flex-start"
            marginBottom={paged.length ? 1 : 0}
            paddingLeft={1}
          >
            <TextInput
              onChange={setSearch}
              onSubmit={onSubmit}
              placeholder="bud.build.config.entry"
              showCursor={true}
              value={search}
            />
          </Box>

          {paged.length > 0 ? (
            <Box
              flexDirection="row"
              justifyContent="flex-start"
              marginTop={1}
            >
              <Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                page{` `}
              </Text>
              <Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                {page + 1}
              </Text>
              <Text>/</Text>
              <Text
                color={
                  action === `up` || action === `down` ? `green` : `white`
                }
              >
                {paged.length}
              </Text>
            </Box>
          ) : null}
        </Box>

        {paged[page] ? (
          <Box
            borderBottom={false}
            borderLeft={true}
            borderLeftColor="dim"
            borderRight={false}
            borderStyle="single"
            borderTop={false}
            flexDirection="column"
            justifyContent="flex-start"
            paddingLeft={1}
          >
            <Text>{paged[page]}</Text>
          </Box>
        ) : null}
      </Box>

      <Box flexDirection="row" marginY={1}>
        <Text>
          <Text
            backgroundColor={action === `esc` ? `green` : `white`}
            color="black"
          >
            [esc]
          </Text>
          {` `}quit
        </Text>
        <Text>{`  `}</Text>
        <Text>
          <Text
            backgroundColor={action === `tab` ? `green` : `white`}
            color="black"
          >
            [tab]
          </Text>
          {` `}clear
        </Text>
        <Text>{`  `}</Text>
        <Text>
          <Text
            backgroundColor={action === `down` ? `green` : `white`}
            color="black"
          >
            [↓]
          </Text>
          {` `}next
        </Text>
        <Text>{`  `}</Text>
        <Text>
          <Text
            backgroundColor={action === `up` ? `green` : `white`}
            color="black"
          >
            [↑]
          </Text>
          {` `}prev
        </Text>
        <Text>{`  `}</Text>
        <Text>
          <Text
            backgroundColor={action === `return` ? `green` : `white`}
            color="black"
          >
            [return]
          </Text>
          {` `}eval
        </Text>
      </Box>
    </Box>
  )
}
