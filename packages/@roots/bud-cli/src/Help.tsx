import {React, Box, Text, Gradient} from '@roots/bud-support'
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
        <Box
          marginBottom={1}
          width={width}
          display="flex"
          flexDirection="column">
          <Box marginBottom={1}>
            <Text>
              <Gradient name="teen">Positionals</Gradient>
            </Text>
          </Box>
          {positionals.map((list, id) => (
            <List key={id} items={list} />
          ))}
        </Box>
      )}

      {options?.length > 0 && (
        <Box
          marginBottom={1}
          width={width}
          display="flex"
          flexDirection="column">
          <Box marginBottom={1}>
            <Text>
              <Gradient name="teen">Options</Gradient>
            </Text>
          </Box>
          {options.map((list, id) => (
            <List key={id} items={list} />
          ))}
        </Box>
      )}

      {commands?.length > 0 && (
        <Box
          marginBottom={1}
          width={width}
          display="flex"
          flexDirection="column">
          <Box marginBottom={1}>
            <Text>
              <Gradient name="teen">Commands</Gradient>
            </Text>
          </Box>

          {commands.map((list, id) => (
            <List key={id} items={list} />
          ))}
        </Box>
      )}
    </Box>
  )
}

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
