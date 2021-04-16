import React from 'react'
import {render} from 'ink'
import {Component} from './Component'

export const Write = (content, props) => {
  render(<Component {...props}>{content}</Component>)
}
