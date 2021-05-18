import React from 'react'
import {render} from 'ink'
import {Component} from './Component'

const Write = (content, props) => {
  render(<Component {...props}>{content}</Component>)
}

export {Write}
