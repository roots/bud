[@roots/budpack](../README.md) › [Globals](../globals.md) › ["compiler/hooks/useFocusState"](_compiler_hooks_usefocusstate_.md)

# Module: "compiler/hooks/useFocusState"

## Index

### Variables

* [useFocusState](_compiler_hooks_usefocusstate_.md#const-usefocusstate)

## Variables

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

Defined in src/compiler/hooks/useFocusState.js:4
