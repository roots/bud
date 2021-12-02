import React from 'react'

export const Banner = ({name, description, logo}) => (
  <>
    <h tag="p" align="center">
      {`<img src="${logo}" height="100" alt="Bud" />`}
    </h>

    <h tag="p" align="center">
      {`<img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />`}
      {`<img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />`}
      {`<img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />`}
    </h>

    <h tag="h1" align="center">
      {`<strong>${name}</strong>`}
    </h>

    <h tag="p" align="center">
      {description}
    </h>
  </>
)
