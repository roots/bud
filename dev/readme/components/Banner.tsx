import React from 'react'

export const Banner = ({title, description, logo}) => (
  <span>
    {`\
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
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square"
    />
  </a>
</p>

<h1 align="center">
  <strong>${title}</strong>
</h1>

> ${description}`}
  </span>
)
