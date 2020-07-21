const React = require('react')
const globalState = require('./useStore')

const useFocusState = globalState(
  React,
  {
    assets: true,
    debug: false,
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

module.exports = {useFocusState}
