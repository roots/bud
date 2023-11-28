/* eslint-disable react/no-unescaped-entities */
import {Display as Error} from '@roots/bud-dashboard/components/error'
import {Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

export const BuildInfo = ({
  error,
  name,
  time,
}: {
  error?: Error | string | undefined
  name: string
  time: string
}) => {
  if (error) {
    return (
      <LabelBox color="red">
        <Error error={error} />
      </LabelBox>
    )
  }

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
