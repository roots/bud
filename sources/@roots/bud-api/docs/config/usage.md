---
title: Usage
---

The function accepts one of the following two parameters:

1. An object with a partial Webpack configuration.
2. A function that takes a partial Webpack configuration and returns a modified partial Webpack configuration.

## Returns

The **bud.config** function returns the `Bud` instance to allow for method chaining.

## Usage

To use the **bud.config** function, you can either provide an object with the new configuration properties or a function that modifies the existing configuration.

Here's an example of using **bud.config** with an object:

```typescript
import {config} from './config'

bud.config({
  output: {
    path: 'my/new/output/path',
  },
})
```

And here's an example of using **bud.config** with a function:

```typescript
bud.config(existingConfig => ({
  ...existingConfig,
  output: {
    ...existingConfig.output,
    path: 'my/new/output/path',
  },
}))
```
