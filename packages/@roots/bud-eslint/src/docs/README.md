## Installation

```sh
yarn add @roots/bud-eslint --dev
```

## Usage

```js
bud.use(require('@roots/bud-eslint'))
```

## Configuration

Default config:

| key           | value                             |
| ------------- | --------------------------------- |
| extensions    | ['js', 'jsx', 'ts', 'tsx', 'vue'] |
| cache         | true                              |
| cacheLocation | storage directory                 |
| context       | src directory                     |

Configure eslint options using the extensions api

```js
bud.extensions.get('eslint-webpack-plugin').options = {
  // ... options
}
```

Or, using [hooks](config:hooks)

```js
bud.hooks.on(
  'extension/eslint-webpack-plugin/options',
  options => ({
    ...options,
    // overrides
  }),
)
```

Learn more about configuring eslint rules in [the official Eslint user guide](https://eslint.org/docs/user-guide/configuring).
