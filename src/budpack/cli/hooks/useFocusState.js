import React from 'react'
import globalState from 'use-global-hook'

const useFocusState = globalState(
  React,
  {
    assets: true,
    errors: false,
    browserSync: false,
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

export default useFocusState
