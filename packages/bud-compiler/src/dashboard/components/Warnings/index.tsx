import React from 'react'
import {Text} from 'ink'
import {Screen} from '@roots/bud-cli'
import {Warning} from './Warning'

const Warnings = ({warnings}) => (
  <Screen title="Warnings">
    {warnings?.length > 0 ? (
      warnings?.map((warning, i) => (
        <Warning message={warning} key={i} />
      ))
    ) : (
      <Text color="white" dimColor>
        No warnings. ✨
      </Text>
    )}
  </Screen>
)

export {Warnings as default}
