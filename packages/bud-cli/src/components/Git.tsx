import {
  React,
  FunctionComponent,
  Text,
  Box,
  Spinner,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

import {useGit} from '../hooks/useGit'

declare type Git = FunctionComponent

const Git: Git = () => {
  const git = useGit()
  const {colors} = useStyle()

  return !git?.hasError ? (
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
          <Spinner /> Loading{' '}
        </Text>
      )}

      {git.head ? (
        <Text
          backgroundColor={
            git.status ? colors.warning : colors.success
          }
          color={colors.white}>
          {' '}
          {git.head}{' '}
        </Text>
      ) : (
        []
      )}

      {git.status ? (
        <Text
          color={colors.white}
          backgroundColor={colors.error}>
          {' '}
          {git.status}{' '}
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
