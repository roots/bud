<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/ink-use-style</strong>
</h1>

## Overview

Theme hook for React Ink.

## Installation

```sh
yarn add @roots/use-ink-style
```

## Usage

```js
import React from 'react'
import {Box, Text} from 'ink'
import {useStyle} from '@roots/use-ink-style'

const component = () => {
  const {col, ctx, colors} = useStyle()

  return (
    <Box width={col(3)}>
      <Text>3/12 column</Text>
    </Box>

    <Box width={ctx([col(12), col(6), col(3)])}>
      <Text>Sm: 12/12 column</Text>
      <Text>Md: 6/12 column</Text>
      <Text>Lg: 3/12 column</Text>
    </Box>

    <Text color={colors.primary}>
      Colorful.
    </Text>
  )
}
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
