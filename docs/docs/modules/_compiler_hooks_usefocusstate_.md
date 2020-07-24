# Module: "compiler/hooks/useFocusState"

## Variables

### `Const` React

• **React**: *[React](_compiler_hooks_usefocusstate_.md#const-react)* = require('react')

*Defined in [src/compiler/hooks/useFocusState.js:1](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L1)*

___

### `Const` globalState

• **globalState**: *[useStore](_compiler_hooks_usestore_.md#const-usestore)* = require('./useStore')

*Defined in [src/compiler/hooks/useFocusState.js:2](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L2)*

___

### `Const` useFocusState

• **useFocusState**: *any* = globalState(
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

*Defined in [src/compiler/hooks/useFocusState.js:4](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/hooks/useFocusState.js#L4)*
