import React from 'react'
import globalState from './useStore'

type SetFocus = (store: any, value: any) => void
const setFocus: SetFocus = (store, value) => {
  store.setState({
    ...store.state,
    ...value,
  })
}

interface BooleanState {
  [key: string]: boolean
}

const defaultState: BooleanState = {
  assets: true,
  debug: false,
  devServer: false,
  errors: false,
  warnings: false,
}

const useFocusState = globalState(React, defaultState, {
  setFocus,
})

export {useFocusState}
