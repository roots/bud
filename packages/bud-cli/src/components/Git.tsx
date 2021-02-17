import {
  React,
  Text,
  Box,
  FunctionComponent,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {useGit} from '../hooks/useGit'

export const Git: FunctionComponent<{}> = () => {
  const git = useGit()
  const {colors} = useStyle()

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Branch git={git} colors={colors} />
      <Head git={git} colors={colors} />
      <Status git={git} colors={colors} />
    </Box>
  )
}

const Branch = ({git, colors}) =>
  git.branch ? (
    <Text backgroundColor={colors.primary}> {git.branch} </Text>
  ) : (
    <Space />
  )

const Status = ({git, colors}) =>
  git.status ? (
    <Text backgroundColor={colors.accent}> {git.status} </Text>
  ) : (
    <Space />
  )

const Head = ({git, colors}) =>
  git.head ? (
    <Text
      backgroundColor={
        git.status ? colors.warning : colors.success
      }>
      {' '}
      {git.head}{' '}
    </Text>
  ) : (
    <Space />
  )

const Space = () => <Text> </Text>
