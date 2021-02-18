import {React, Text, Spacer} from '@roots/bud-support'

export const Head = ({git, colors}) =>
  git.head ? (
    <Text
      backgroundColor={
        git.status ? colors.warning : colors.success
      }>
      {' '}
      {git.head}{' '}
    </Text>
  ) : (
    <Spacer />
  )
