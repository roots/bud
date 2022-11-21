import {join} from 'node:path/posix'

import {paths} from '@repo/constants'

import {release, releases} from './data.js'

const getNewerVersions = (current: release): Array<release> =>
  releases
    .filter(release => release.major === current.major)
    .filter(release => release.minor === current.minor)
    .filter(release => release.patch > current.patch)

const updateNotice = (release: release) => {
  const updates = getNewerVersions(release)
  const latest = updates.pop()
  return !latest
    ? ``
    : `
:::info Updates available

There are patches available for [this release](https://bud.js.org/releases/tags/${release.major}-${release.minor}). Please update to [${release.semver}](https://bud.js.org/releases/${latest.semver}).

:::
`
}

export const body = (release: release) => `---
slug: "${release.semver}"
title: "${release.semver}"
description: Release notes for bud.js ${release.semver}
date: ${release.published_at}
author: ${release.author.login}
author_title: Developer
author_url: ${release.author.html_url}
author_image_url: ${release.author.avatar_url}
tags:
  - release
  - ${release.major}
  - ${release.major}.${release.minor}
---

<!--This file is generated-->

${release.intro}

<!--truncate-->
${updateNotice(release)}

${release.body}
`

export const path = (release: release) =>
  join(
    paths.sources,
    `@repo`,
    `docs`,
    `generated`,
    `releases`,
    `${release.semver}.mdx`,
  )
