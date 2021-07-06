# bud.alias

Register shorthand for resolving modules using webpack aliases.

Useful for situations that may otherwise require brittle relative paths.

## Usage

Imagine a file located at **scripts/my-feature/components/example/index.js** that is importing a function from **scripts/util.js**.

This import statement is very lengthy and fragile.

```js
import {merge} from '../../../util'
```

So, we may wish to define an alias to reference the root of scripts.

```js
bud.alias({
  '@scripts': bud.path('src', 'scripts'),
})
```

And use **bud.alias** to import the script relative to the alias.

```js
import {merge} from '@scripts/util'
```

This can prove especially useful later, should we have cause to move `scripts/my-feature/components/example/index.js`.

Without the alias we would need to rework the relative path between the two files. But, since the alias is independent of the path of the importing file, we don't have to deal with that.
