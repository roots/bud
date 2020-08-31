import React from 'react'
import {Box, Spacer, Text} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

const Bullet = ({active}) => {
  const [width] = useStdOutDimensions()

  return width > 70 ? (
    <Text>{active ? '◉' : ' '}</Text>
  ) : (
    <Text></Text>
  )
}

const Nav = ({build, focus, width, height}) => (
  <Box
    paddingTop={width > 70 ? 2 : 1}
    paddingBottom={width > 70 ? 1 : 0}
    paddingRight={width > 70 ? 4 : 0}
    justifyContent={'flex-start'}
    flexDirection={width > 70 ? 'column' : 'row'}>
    <Box>
      <Text color={focus == 'init' ? 'white' : '#6C758F'}>
        <Bullet active={focus == 'init'} /> Info
      </Text>
    </Box>

    <Box>
      <Text color={focus == 'assets' ? 'white' : '#6C758F'}>
        <Bullet active={focus == 'assets'} /> Assets
      </Text>
    </Box>

    <Box>
      <Text
        color={
          build?.errors?.length > 0
            ? '#dc3545'
            : focus == 'errors'
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focus == 'errors' || false} /> Errors
        {build?.errors?.length > 0 && build.errors[0]
          ? ` [${build.errors.length}]`
          : ``}
      </Text>
    </Box>
    <Box>
      <Text
        color={
          build?.warnings?.length > 0
            ? '#fd7e14'
            : focus == 'warnings'
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focus == 'warnings' || false} /> Warnings
        {build?.warnings?.length > 0
          ? ` [${build?.warnings.length}]`
          : ``}
      </Text>
    </Box>
    <Box>
      <Text color={focus == 'devServer' ? 'white' : '#6C758F'}>
        <Bullet active={focus == 'devServer'} /> DevServer
      </Text>
    </Box>
  </Box>
)

export {Nav}
