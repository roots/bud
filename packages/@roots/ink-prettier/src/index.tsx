import {
  React,
  FunctionComponent,
  Box,
  Text,
  prettier,
} from '@roots/bud-support'

interface Props extends prettier.Options {
  children: string
}

const Prettier: FunctionComponent<Props> = props => (
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
