import {React, Box, Text} from '@roots/bud-support'
import {List} from './List'

export const Layout = ({
  width,
  description,
  name,
  positionals,
  commands,
  options,
}) => {
  return (
    <Box
      width={width}
      flexGrow={1}
      display="flex"
      flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          {name}
          {description ? `: ${description}` : ``}
        </Text>
      </Box>

      {positionals?.length > 0 && (
        <Block
          width={width}
          title="Positionals"
          pairs={positionals}
        />
      )}

      {options?.length > 0 && (
        <Block width={width} title="Options" pairs={options} />
      )}

      {commands?.length > 0 && (
        <Block width={width} title="Commands" pairs={commands} />
      )}
    </Box>
  )
}

const Block = ({width, pairs, title}) => (
  <Box
    marginBottom={1}
    width={width}
    display="flex"
    flexDirection="column">
    <Box marginBottom={1}>
      <Text color="green">{title}</Text>
    </Box>

    {pairs.map((list, id) => (
      <List key={id} items={list} />
    ))}
  </Box>
)
