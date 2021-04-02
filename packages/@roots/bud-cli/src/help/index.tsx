import {React, staticRender} from '@roots/bud-support'
import {Layout} from './Layout'

/**
 * Format help
 */
export const formatHelp = (cmd, helper) => {
  return staticRender(
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
