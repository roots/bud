import React, {FunctionComponent, ReactElement} from 'react'
import {Box} from 'ink'
import Title from './Title'

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
    margin={1}
    justifyContent="flex-start"
    flexDirection="column">
    {title && <Title>{title}</Title>}
    {children}
  </Box>
)

export {Screen as default}
