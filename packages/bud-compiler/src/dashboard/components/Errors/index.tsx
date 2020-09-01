import React, {FunctionComponent} from 'react'
import {Text} from 'ink'
import Screen from '../UI/Screen'
import {Error} from './Error'

interface ErrorsProps {
  errors: any
}

const Errors: FunctionComponent<ErrorsProps> = ({errors}) => (
  <Screen title="Errors">
    {errors && errors.length > 0 ? (
      errors.map((err, i) => <Error message={err} key={i} />)
    ) : (
      <Text color="white" dimColor>
        No errors ✨
      </Text>
    )}
  </Screen>
)

export {Errors as default}
