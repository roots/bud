import React, {FunctionComponent} from 'react'
import {Text, Box} from 'ink'
import {useStyle} from '@roots/ink-use-style'

import {useGit} from '../hooks/useGit'
import Spinner from 'ink-spinner'

declare type Git = FunctionComponent

const Git: Git = () => {
  const git = useGit()
  const {colors} = useStyle()

  return !git?.err ? (
    <Box flexDirection="row" justifyContent="space-between">
      {git.branch ? (
        <Text
          backgroundColor={colors.primary}
          color={colors.white}>
          {' '}
          {git.branch}{' '}
        </Text>
      ) : (
        <Text color={colors.white}>
          {' '}
          <Spinner /> Loading git status{' '}
        </Text>
      )}

      {git.head ? (
        <Text
          backgroundColor={colors.success}
          color={colors.white}>
          {' '}
          {git.head}{' '}
        </Text>
      ) : (
        []
      )}

      {git.dirty || git.status ? (
        <Text
          color={colors.white}
          backgroundColor={colors.error}>
          {git.status ? <Text> ? </Text> : []}
          {git.dirty ? <Text> M </Text> : []}
        </Text>
      ) : (
        []
      )}
    </Box>
  ) : (
    <Text>Git unreachable</Text>
  )
}

export {Git}
