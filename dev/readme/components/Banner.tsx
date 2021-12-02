import React from 'react'

export const Banner = ({name, description, logo}) => (
  <raw>
    {`
<p align="center">
  <img alt="Bud" src="${logo}" height="100" />
</p>

<p align="center">
  <img
    alt="MIT License"
    src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square"
  />
  <a href="https://www.npmjs.com/package/@roots/bud">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/roots/bud">
    <img src="https://codecov.io/gh/roots/bud/branch/next/graph/badge.svg?token=DRJ28OD8XD" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square"
    />
  </a>
</p>

<h1 align="center">
  <strong>${name}</strong>
</h1>

${description}`}
  </raw>
)
