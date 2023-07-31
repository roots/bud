import View from '@roots/bud-dashboard/components/view'
import {Box, Text} from '@roots/bud-support/ink'

type Data = Array<unknown> | number | Record<string, unknown> | string

export interface Props {
  compilation?: Record<string, Data>
  config?: Record<string, Data>
  debug?: boolean
}

export default function Debug({compilation, debug}: Props) {
  if (!debug) return null
  if (!compilation) return null

  const format = (obj: Record<string, unknown>) =>
    Object.entries(obj ?? {})
      .filter(
        ([k, v]) =>
          typeof v !== `undefined` &&
          typeof v !== `string` &&
          typeof v !== `number` &&
          v !== null &&
          !(Array.isArray(v) && v.length === 0),
      )
      .map(([k, v]) => [k, typeof v === `function` ? `function` : v])

  return (
    <>
      {format(compilation).map(([key, fields], id) => {
        if (typeof key !== `string`) return null

        return (
          <View
            footer={
              <Text color="dim">
                debug config: {`${id + 1}`} /{` `}
                {`${format(compilation).length}`}
              </Text>
            }
            head={<Text color="cyan">stats: {key}</Text>}
            key={id}
          >
            <Box flexDirection="column" gap={0}>
              <Fields fields={fields} />
            </Box>
          </View>
        )
      })}
    </>
  )
}

const isPrimitive = (field: unknown): field is number | string => {
  return typeof field === `string` || typeof field === `number`
}

const Fields = ({fields}: {fields: unknown}) => {
  if (fields === undefined) {
    return <Text wrap="truncate-end">undefined</Text>
  }

  if (typeof fields === `boolean`) {
    return <Text>{`${fields}`}</Text>
  }

  if (fields === null) {
    return <Text wrap="truncate-end">null</Text>
  }

  if (Array.isArray(fields) && fields.length === 0) {
    return <Text wrap="truncate-end">[]</Text>
  }

  if (isPrimitive(fields)) {
    const preLoaderSplit = `${fields}`.split(`!`).pop()
    if (!preLoaderSplit) return null
    return (
      <Text wrap="truncate-end">{preLoaderSplit.split(`?`).pop()}</Text>
    )
  }

  return Object.entries(fields)
    .filter(([k, v]) => v !== undefined && v !== null)
    .map(([key, fields], id) => {
      if (!fields) return null

      return (
        <Box
          borderTop={!isPrimitive(fields)}
          flexDirection={isPrimitive(fields) ? `row` : `column`}
          gap={isPrimitive(fields) ? 1 : 0}
          key={id}
          overflowX="hidden"
          paddingLeft={1}
        >
          <Text color="cyan">{typeof key === `string` ? key : `-`}:</Text>
          <Fields fields={fields} />
        </Box>
      )
    })
}
