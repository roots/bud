/* eslint-disable react/no-unescaped-entities */
import {LabelBox} from '@roots/bud/cli/components/LabelBox'
import {Text} from '@roots/bud-support/ink'

export const BuildInfo = ({
  name,
  time,
}: {
  error?: Error | string | undefined
  name: string
  time: string
}) => {
  return (
    <LabelBox label={name}>
      <Text italic>
        Completed a dry run of your project's build (executed in {time}
        {` `}
        seconds).
      </Text>
    </LabelBox>
  )
}
