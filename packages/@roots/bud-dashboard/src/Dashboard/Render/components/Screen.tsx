import {
  React,
  FunctionComponent,
  ReactElement,
  Box,
} from '@roots/bud-support'

import {Title} from './Title'

interface ScreenInterface {
  title?: string
  display?: boolean
  children:
    | FunctionComponent
    | FunctionComponent[]
    | ReactElement
}

const Screen: FunctionComponent<ScreenInterface> = ({
  title,
  display = true,
  children,
}) => (
  <Box
    display={display ? 'flex' : 'none'}
    marginTop={0}
    marginBottom={1}
    marginLeft={1}
    justifyContent="flex-start"
    flexDirection="column">
    {title && <Title>{title}</Title>}
    {children}
  </Box>
)

export {Screen as default}
