import {Ink, React} from '@roots/bud-support'

import {Bar} from './Bar'

export const Progress = ({progress, theme}) => {
  return (
    <Ink.Box flexDirection="row">
      <Ink.Box>
        <Bar
          character={'▉'}
          maxWidth={theme.bounds.width - 10}
          colors={[
            theme.colors.primary,
            theme.colors.primaryAlt,
          ]}
          percent={progress[0]}
        />
      </Ink.Box>
    </Ink.Box>
  )
}
