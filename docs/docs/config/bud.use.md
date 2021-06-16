# bud.use

Extend **bud** with additional functionality by registering packages with **bud.use**.

## Usage

Add support for [sass](https://sass-lang.com) using the [@roots/bud-sass](docs/add-ons/sass) extension.

```js
bud.use(require('@roots/bud-sass'))
```

Multiple extensions can be added as an array:

```js
bud.use([
  require('@roots/bud-sass'),
  require('@roots/bud-typescript'),
])
```

In a ts config, you can utilize import syntax:

```ts
import sass from '@roots/bud-sass'
import typescript from '@roots/bud-typescript'

// ...

bud.use([sass, typescript])
```

You can also override definitions before utilizing the extension if something isn't quite working out for you:

```ts
import {name, make, when} from '@roots/bud-critical-css'

// ...

bud.use({
  name,
  make,
  when: ({inDevelopment}) => inDevelopment === true,
})
```
