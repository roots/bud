# Class: Bar ‹**P, S, SS, P, S**›

## Type parameters

▪ **P**

▪ **S**

▪ **SS**

▪ **P**

▪ **S**

## Hierarchy

* Component

  ↳ **Bar**

## Constructors

###  constructor

\+ **new Bar**(`props`: Readonly‹P›): *[Bar](bar.md)*

*Inherited from [Bar](bar.md).[constructor](bar.md#constructor)*

Defined in node_modules/@types/react/index.d.ts:476

**`deprecated`** 

**`see`** https://reactjs.org/docs/legacy-context.html

**Parameters:**

Name | Type |
------ | ------ |
`props` | Readonly‹P› |

**Returns:** *[Bar](bar.md)*

\+ **new Bar**(`props`: P, `context?`: any): *[Bar](bar.md)*

*Inherited from [Bar](bar.md).[constructor](bar.md#constructor)*

Defined in node_modules/@types/react/index.d.ts:478

**`deprecated`** 

**`see`** https://reactjs.org/docs/legacy-context.html

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |
`context?` | any |

**Returns:** *[Bar](bar.md)*

## Properties

###  context

• **context**: *any*

*Inherited from [Bar](bar.md).[context](bar.md#context)*

Defined in node_modules/@types/react/index.d.ts:476

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

___

### `Readonly` props

• **props**: *Readonly‹P› & Readonly‹object›*

*Inherited from [Bar](bar.md).[props](bar.md#readonly-props)*

Defined in node_modules/@types/react/index.d.ts:501

___

###  refs

• **refs**: *object*

*Inherited from [Bar](bar.md).[refs](bar.md#refs)*

Defined in node_modules/@types/react/index.d.ts:507

**`deprecated`** 
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Type declaration:

* \[ **key**: *string*\]: ReactInstance

___

###  state

• **state**: *Readonly‹S›*

*Inherited from [Bar](bar.md).[state](bar.md#state)*

Defined in node_modules/@types/react/index.d.ts:502

___

### `Static` `Optional` contextType

▪ **contextType**? : *Context‹any›*

*Inherited from [Bar](bar.md).[contextType](bar.md#static-optional-contexttype)*

Defined in node_modules/@types/react/index.d.ts:458

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

## Methods

### `Optional` UNSAFE_componentWillMount

▸ **UNSAFE_componentWillMount**(): *void*

*Inherited from [Bar](bar.md).[UNSAFE_componentWillMount](bar.md#optional-unsafe_componentwillmount)*

Defined in node_modules/@types/react/index.d.ts:702

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### `Optional` UNSAFE_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`: Readonly‹P›, `nextContext`: any): *void*

*Inherited from [Bar](bar.md).[UNSAFE_componentWillReceiveProps](bar.md#optional-unsafe_componentwillreceiveprops)*

Defined in node_modules/@types/react/index.d.ts:734

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹P› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` UNSAFE_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`: Readonly‹P›, `nextState`: Readonly‹S›, `nextContext`: any): *void*

*Inherited from [Bar](bar.md).[UNSAFE_componentWillUpdate](bar.md#optional-unsafe_componentwillupdate)*

Defined in node_modules/@types/react/index.d.ts:762

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹P› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` componentDidCatch

▸ **componentDidCatch**(`error`: [Error](../globals.md#const-error), `errorInfo`: ErrorInfo): *void*

*Inherited from [Bar](bar.md).[componentDidCatch](bar.md#optional-componentdidcatch)*

Defined in node_modules/@types/react/index.d.ts:631

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

**Parameters:**

Name | Type |
------ | ------ |
`error` | [Error](../globals.md#const-error) |
`errorInfo` | ErrorInfo |

**Returns:** *void*

___

### `Optional` componentDidMount

▸ **componentDidMount**(): *void*

*Inherited from [Bar](bar.md).[componentDidMount](bar.md#optional-componentdidmount)*

Defined in node_modules/@types/react/index.d.ts:610

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

**Returns:** *void*

___

### `Optional` componentDidUpdate

▸ **componentDidUpdate**(`prevProps`: Readonly‹P›, `prevState`: Readonly‹S›, `snapshot?`: SS): *void*

*Inherited from [Bar](bar.md).[componentDidUpdate](bar.md#optional-componentdidupdate)*

Defined in node_modules/@types/react/index.d.ts:673

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

**Parameters:**

Name | Type |
------ | ------ |
`prevProps` | Readonly‹P› |
`prevState` | Readonly‹S› |
`snapshot?` | SS |

**Returns:** *void*

___

### `Optional` componentWillMount

▸ **componentWillMount**(): *void*

*Inherited from [Bar](bar.md).[componentWillMount](bar.md#optional-componentwillmount)*

Defined in node_modules/@types/react/index.d.ts:688

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### `Optional` componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`: Readonly‹P›, `nextContext`: any): *void*

*Inherited from [Bar](bar.md).[componentWillReceiveProps](bar.md#optional-componentwillreceiveprops)*

Defined in node_modules/@types/react/index.d.ts:717

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹P› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` componentWillUnmount

▸ **componentWillUnmount**(): *void*

*Inherited from [Bar](bar.md).[componentWillUnmount](bar.md#optional-componentwillunmount)*

Defined in node_modules/@types/react/index.d.ts:626

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** *void*

___

### `Optional` componentWillUpdate

▸ **componentWillUpdate**(`nextProps`: Readonly‹P›, `nextState`: Readonly‹S›, `nextContext`: any): *void*

*Inherited from [Bar](bar.md).[componentWillUpdate](bar.md#optional-componentwillupdate)*

Defined in node_modules/@types/react/index.d.ts:747

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹P› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *void*

___

###  forceUpdate

▸ **forceUpdate**(`callback?`: function): *void*

*Inherited from [Bar](bar.md).[forceUpdate](bar.md#forceupdate)*

Defined in node_modules/@types/react/index.d.ts:493

**Parameters:**

▪`Optional`  **callback**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Optional` getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`: Readonly‹P›, `prevState`: Readonly‹S›): *SS | null*

*Inherited from [Bar](bar.md).[getSnapshotBeforeUpdate](bar.md#optional-getsnapshotbeforeupdate)*

Defined in node_modules/@types/react/index.d.ts:667

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

**Parameters:**

Name | Type |
------ | ------ |
`prevProps` | Readonly‹P› |
`prevState` | Readonly‹S› |

**Returns:** *SS | null*

___

###  getString

▸ **getString**(): *any*

*Defined in [src/compiler/components/LoadingBar.js:16](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L16)*

**Returns:** *any*

___

###  render

▸ **render**(): *Element‹›*

*Overrides void*

*Defined in [src/compiler/components/LoadingBar.js:38](https://github.com/roots/bud-support/blob/bd00b72/src/compiler/components/LoadingBar.js#L38)*

**Returns:** *Element‹›*

___

###  setState

▸ **setState**‹**K**›(`state`: function | S | object, `callback?`: function): *void*

*Inherited from [Bar](bar.md).[setState](bar.md#setstate)*

Defined in node_modules/@types/react/index.d.ts:488

**Type parameters:**

▪ **K**: *keyof S*

**Parameters:**

▪ **state**: *function | S | object*

▪`Optional`  **callback**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Optional` shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: Readonly‹P›, `nextState`: Readonly‹S›, `nextContext`: any): *boolean*

*Inherited from [Bar](bar.md).[shouldComponentUpdate](bar.md#optional-shouldcomponentupdate)*

Defined in node_modules/@types/react/index.d.ts:621

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹P› |
`nextState` | Readonly‹S› |
`nextContext` | any |

**Returns:** *boolean*
