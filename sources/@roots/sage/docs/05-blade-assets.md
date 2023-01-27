---
title: Handling blade `@asset` directives
---

You can add blade template files to entrypoints as if they were javascript modules.

```js
export default async bud => {
  bud.entry({
    app: ['@scripts/app', '@styles/app'],
    editor: ['@scripts/editor', '@styles/editor'],
    index: ['@views/index'],
  })
}
```

Any modules referenced with the `@asset` directive will be included in the compilation.

If you wanted to include _all_ blade templates, you could do so with `bud.glob`.

```js
export default async bud => {
  bud.entry({
    app: [
      '@scripts/app',
      '@styles/app',
      ...(await bud.glob(`@views/**/*.blade.php`)),
    ],
    editor: ['@scripts/editor', '@styles/editor'],
  })
}
```

## Adding scripts and styles to blade templates

You may include client scripts and styles directly in blade templates using directives. This is different than other community packages because the code is extracted and ran through the compiler This means you can write postcss, sass, typescript, etc.

```js
@extends('layouts.app')

@section('content')
  <img src=@asset('images/404.png?as=webp') />
  <img src=@asset('images/404.png?as=webp&width=200') />
  <div id="target-el"></div>
@endsection

@js
import {render} from '@scripts/render'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('target-el')
);
@endjs

@css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-blue-500;
}
@endcss
```

Current supported extensions: `js`, `ts`, `css`, `scss`, `vue`.

Note that in order to use `ts`, `scss` or `vue` you will need to have installed a bud extension that supports that language or framework.
