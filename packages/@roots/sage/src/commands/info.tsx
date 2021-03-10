import {Box, Text, React, prettyFormat} from '@roots/bud-support'
import {Command} from '@roots/bud-cli'

/**
 * Info
 */
export class Info extends Command {
  public name = 'info'

  public signature = `info`

  public description = `Application information`

  public get projectDir() {
    return this.cli.app.store.get('locations.project')
  }

  public action(): void {
    this.cli.app.dashboard.render(
      <Box flexDirection="column">
        <Block title="Available extensions">
          {this.cli.app.discovery.getKeys().map((label, id) => (
            <Text key={id}>{label}</Text>
          ))}
        </Block>

        <Block title="Options">
          {this.cli.app.store
            .getEntries('project')
            .map(([label, value], id) => (
              <Text key={id}>
                {label}:{' '}
                {prettyFormat(value, {callToJSON: true})}
              </Text>
            ))}
        </Block>
      </Box>,
    )
  }
}

const Block = ({title, children}) => (
  <Box flexDirection="column" marginBottom={1}>
    <Box marginBottom={1}>
      <Text color="green">{title}</Text>
    </Box>

    {children}
  </Box>
)
