/**
 * Forked from {@link https://github.com/andregardi/use-global-hook}
 */

import ReactLib from 'react'

type Store = {
  actions: any
  state: any
  listeners: any[]
  setState: (any) => any
}

type StoreFactory = (
  store: {
    state: any
    listeners: any
  },
  actions: any,
) => Store

const makeStore: StoreFactory = (
  store: {state; listeners},
  actions,
) => ({
  ...store,
  setState: setState.bind(null, store),
  actions: associateActions(store, actions),
})

interface SetStateArgs {
  store: {state: any; listeners: any[]}
  newState: any
  afterUpdateCallback: () => any
}
type SetState = (...SetStateArgs) => void
const setState: SetState = function (
  store,
  newState,
  afterUpdateCallback,
) {
  store.state = {
    ...store.state,
    ...newState,
  }

  store.listeners.forEach(listener => {
    listener.run(store.state)
  })

  afterUpdateCallback && afterUpdateCallback()
}

interface StorageArgs {
  store: {
    state: any
    actions: any
    listeners: {
      oldState: any[]
    }[]
  }
  React: typeof ReactLib
  mapState: (arg0: any) => any
  mapActions: (arg0: any) => any
}
type Storage = (...StorageArgs) => [any, any]

const storage: Storage = function (
  store,
  React,
  mapState,
  mapActions,
) {
  const [, originalHook] = React.useState(Object.create(null))
  const state = mapState ? mapState(store.state) : store.state
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions],
  )

  React.useEffect(() => {
    const newListener: any = {oldState: {}}
    newListener.run = mapState
      ? newState => {
          const mappedState = mapState(newState)
          if (mappedState !== newListener.oldState) {
            newListener.oldState = mappedState
            originalHook(mappedState)
          }
        }
      : originalHook
    store.listeners.push(newListener)
    newListener.run(store.state)
    return () => {
      store.listeners = store.listeners.filter(
        listener => listener !== newListener,
      )
    }
  }, []) // eslint-disable-line
  return [state, actions]
}

interface AssociateActionsArgs {
  store: {
    state: any
    listeners: any[]
  }
  actions: {
    [x: string]: any
  }[]
}
type AssociateActions = (...AssociateActionsArgs) => any

const associateActions: AssociateActions = function (store, actions) {
  const associatedActions = {}

  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store)
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key])
    }
  })

  return associatedActions
}

interface UseStoreHookArguments {
  React: typeof ReactLib
  initialState: any
  actions: any
  initializer: any
  listeners: any[]
}

type UseStoreHook = (...UseStoreHookArguments) => any

const useStore: UseStoreHook = (
  React: typeof ReactLib,
  initialState,
  actions: {
    setFocus: (store: any, value: any) => void
  },
  initializer = null,
  listeners: [],
) => {
  const store = makeStore({state: initialState, listeners}, actions)

  if (initializer) initializer(store)

  return storage.bind(null, store, React)
}

export default useStore
