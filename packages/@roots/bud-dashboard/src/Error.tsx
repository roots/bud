import React from 'react'

import {Error as Component} from './components/Error'

/**
 * CLI Error handler
 *
 * @param body - Error body
 * @param title - Error title
 * @returns void
 *
 * @public
 */
export const Error: CallableFunction = (
  body: string,
  title: string,
) => {
  return <Component title={title ?? 'Error'} body={body ?? ''} />
}
