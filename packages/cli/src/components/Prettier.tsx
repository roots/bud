import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {format, Options} from 'prettier'

interface PrettierProps extends Options {
  children: string
}

type PrettierFunctionComponent = FunctionComponent<PrettierProps>

const Prettier: PrettierFunctionComponent = props => (
  <Box
    marginBottom={1}
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    alignSelf="flex-start">
    <Text>
      {format(props.children, {
        parser: props.parser ?? 'babel',
        ...props,
      })}
    </Text>
  </Box>
)

export {Prettier as default, PrettierFunctionComponent}
