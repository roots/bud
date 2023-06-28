---
title: Usage
---

### @roots/wordpress-transforms/handle

Transform a request for a WordPress provided package to its enqueue handle.

- `@wordpress/dom-ready` => `'dom-ready'`
- `react` => `'react'`
- `not-provided-package` => `undefined`

```ts
import {transform} from '@roots/wordpress-transforms/handle'

transform(`@wordpress/edit-post`)
// ==> `wp-edit-post`

transform(`lodash`)
// ==> `lodash`

transform(`non-match`)
// ==> undefined
```

### @roots/wordpress-transforms/window

Transform a request for a WordPress provided package to its window variable (expressesd as an array).

- `@wordpress/dom-ready` => `['wp', 'domReady']`
- `react` => `['React']`
- `not-provided-package` => `undefined`

```ts
import {transform} from '@roots/wordpress-transforms/window'

transform(`@wordpress/edit-post`)
// ==> [`wp`, `editPost`]

transform(`lodash`)
// ==> [`lodash`]

transform(`non-match`)
// ==> undefined
```

### @roots/wordpress-transforms/wordpress

Utilities used by [@roots/wordpress-transforms/handle](#rootswordpress-transformshandle) and [@roots/wordpress-transforms/window](#rootswordpress-transformswindow).

Examples:

```ts
import * as wp from '@roots/wordpress-transforms/wordpress'

wp.isLibrary(`jquery`) // true
wp.isLibrary(`@wordpress/dom-ready`) // false
wp.isLibrary(`non-match`) // false

wp.isProvided(`@wordpress/icons`) // false
wp.isProvided(`lodash`) // true

wp.isWordPressRequest(`@wordpress/element`) // true
wp.isWordPressRequest(`lodash`) // false

wp.normalize(`../node_modules/react-refresh/runtime/foo/bar`) // `react-refresh/runtime`
```

### @roots/wordpress-transforms

The three submodules are exported from root.

```ts
import {handle, window, wordpress} from '@roots/wordpress-transforms'

handle.transform(/**  */)

window.transform(/** */)

wordpress.isLibrary(/** */)
```
