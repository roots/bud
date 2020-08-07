import React from 'react'
import globalState from './useStore'

const useFocusState = globalState(
  React,
  {
    assets: true,
    debug: false,
    devServer: false,
    errors: false,
    warnings: false,
  },
  {
    setFocus: (store, value) => {
      store.setState({
        ...store.state,
        ...value,
      })
    },
  },
)

export {useFocusState}
