import {React, Box, Text} from '@roots/bud-support'
import {render} from 'ink-testing-library'

const List = ({items}: {items: string[][]}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between">
      {items.map((item, id) => (
        <Text wrap="truncate-end" key={id}>
          {item}
        </Text>
      ))}
    </Box>
  )
}

const Layout = ({
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

export const formatHelp = (cmd, helper) => {
  return render(
    <Layout
      width={process.stdout.columns - 4}
      name={cmd.name()}
      description={cmd.description()}
      positionals={Object.values(
        helper.visibleArguments(cmd),
      ).map((v: {term; description}) => [v.term, v.description])}
      options={helper
        .visibleOptions(cmd)
        .map(opt => [opt.flags, opt.description])
        .filter(opt => !opt[0]?.includes(`-h, --help`))}
      commands={helper
        .visibleCommands(cmd)
        .map(cmd => [cmd.name(), cmd.description()])}
    />,
  ).lastFrame()
}
