import React, {FunctionComponent} from 'react'

import Error from './Error'

interface ErrorsProps {
  errors: any
}

const Errors: FunctionComponent<ErrorsProps> = ({errors}) =>
  errors ? <Error message={errors} /> : <></>

export {Errors as default}
