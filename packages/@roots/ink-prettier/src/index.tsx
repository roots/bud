import {Box, Text} from 'ink'
import * as prettier from 'prettier'
import * as React from 'react'

interface Props extends prettier.Options {
  children: string
  parser?: prettier.BuiltInParserName
}

const Prettier: React.FunctionComponent<Props> = props => (
  <Box
    marginBottom={1}
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    alignSelf="flex-start">
    <Text>
      {prettier.format(props.children, {
        parser: props.parser ?? 'babel',
        ...props,
      })}
    </Text>
  </Box>
)

export {Prettier as default, Prettier}
