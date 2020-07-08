[@roots/budpack](../globals.md) › ["base/loaders"](_base_loaders_.md)

# Module: "base/loaders"

## Index

### Object literals

* [loaders](_base_loaders_.md#const-loaders)
* [schema](_base_loaders_.md#const-schema)

## Object literals

### `Const` loaders

### ▪ **loaders**: *object*

*Defined in [base/loaders.js:12](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L12)*

Loader options

###  babel

• **babel**: *any* = babel ? require(babel) : schema.babel

*Defined in [base/loaders.js:13](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L13)*

###  postCss

• **postCss**: *any* = postCss ? require(postCss) : schema.postCss

*Defined in [base/loaders.js:14](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L14)*

▪ **svg**: *object*

*Defined in [base/loaders.js:15](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L15)*

* **use**: *string[]* = [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ]

___

### `Const` schema

### ▪ **schema**: *object*

*Defined in [base/loaders.js:3](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L3)*

###  eslint

• **eslint**: *object*

*Defined in [base/loaders.js:5](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L5)*

#### Type declaration:

▪ **babel**: *object*

*Defined in [base/loaders.js:4](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L4)*

* **plugins**: *undefined[]* = []

* **presets**: *undefined[]* = []

▪ **postCss**: *object*

*Defined in [base/loaders.js:6](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/loaders.js#L6)*

* **plugins**: *undefined[]* = []
