import {Box, Text} from 'ink'
import * as prettier from 'prettier'
import * as React from 'react'

interface Props extends prettier.Options {
  children: string
  parser?: prettier.BuiltInParserName
}

interface InkPrettier extends React.FunctionComponent<Props> {}

const InkPrettier: InkPrettier = props => (
  <Box
    marginBottom={1}
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    alignSelf="flex-start"
  >
    <Text>
      {prettier.format(props.children, {
        parser: props.parser ?? 'babel',
        ...props,
      })}
    </Text>
  </Box>
)

export {InkPrettier}
