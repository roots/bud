import * as React from 'react'

export const Banner = ({
  title = null,
  description = null,
  logo = null,
}) => (
  <span>
    {`\
${
  logo
    ? `<p align="center">
  <img alt="Bud" src="${logo}" height="100" />
</p>`
    : ``
}

<p align="center">
  <img
    alt="MIT License"
    src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square"
  />
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Froots%2Fbud?ref=badge_small" alt="FOSSA Status">
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Froots%2Fbud.svg?type=small"/>
  </a>
  <a href="https://www.npmjs.com/package/@roots/bud">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/roots/bud">
    <img src="https://codecov.io/gh/roots/bud/branch/next/graph/badge.svg?token=DRJ28OD8XD"/>
  </a>
  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square"
    />
  </a>
</p>

${
  title
    ? `
<h1 align="center">
  <strong>${title}</strong>
</h1>`
    : ``
}

${description ? `> ${description}` : ``}`}
  </span>
)
