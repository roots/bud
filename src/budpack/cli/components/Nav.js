import React from 'react'
import {Box, Spacer, Text} from 'ink'

const Bullet = ({active}) => (
  <Text>{active ? '◉' : ' '}</Text>
)

/**
 * Nav
 */
const Nav = ({build, focused, options}) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    marginBottom={1}>
    <Box>
      <Text color={'#545DD7'}>@roots/bud</Text>
    </Box>
    <Spacer />
    <Spacer />
    <Spacer />
    <Box>
      <Text
        color={focused?.assets ? 'white' : '#6C758F'}>
        <Bullet active={focused?.assets} /> Assets
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text
        color={
          build?.errors?.length > 0
            ? '#dc3545'
            : focused?.errors
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focused?.errors} /> Errors
        {build?.errors?.length > 0
          ? ` [${build?.errors.length}]`
          : `  `}
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text
        color={
          build?.warnings?.length > 0
            ? '#fd7e14'
            : focused?.warnings
            ? 'white'
            : '#6C758F'
        }>
        <Bullet active={focused?.warnings} /> Warnings
        {build?.warnings?.length > 0
          ? ` [${build?.warnings.length}]`
          : `  `}
      </Text>
    </Box>

    {!options?.debug && options?.browserSync?.enabled && (
      <>
        <Spacer />
        <Box>
          <Text
            color={
              focused?.browserSync ? 'white' : '#6C758F'
            }>
            <Bullet active={focused?.browserSync} />{' '}
            BrowserSync
          </Text>
        </Box>
      </>
    )}

    {options?.debug && (
      <>
        <Spacer />
        <Box>
          <Text
            color={
              focused?.debug ? '#ffc107' : '#ffe598'
            }>
            <Bullet active={focused?.debug} />{' '}
            Debug
          </Text>
        </Box>
      </>
    )}
  </Box>
)

export default Nav
