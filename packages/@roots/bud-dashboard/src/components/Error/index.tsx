import {Ink, React} from '@roots/bud-support'

import {Component} from './Error'

const Error: CallableFunction = (
  body: string,
  title: string,
) => {
  Ink.render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )
}

export {Error}
