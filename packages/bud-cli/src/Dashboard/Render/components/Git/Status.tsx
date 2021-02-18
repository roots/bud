import {React, Text, Spacer} from '@roots/bud-support'

export const Status = ({git, colors}) =>
  git.status ? (
    <Text backgroundColor={colors.accent}> {git.status} </Text>
  ) : (
    <Spacer />
  )
