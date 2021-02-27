import {React, render} from '@roots/bud-support'
import {Component} from './Component'

export const Write = (content, props) => {
  render(<Component {...props}>{content}</Component>)
}
