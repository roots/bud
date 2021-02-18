import {React, Text, Spacer} from '@roots/bud-support'

export const Branch = ({git, colors}) =>
  git.branch ? (
    <Text backgroundColor={colors.primary}> {git.branch} </Text>
  ) : (
    <Spacer />
  )
