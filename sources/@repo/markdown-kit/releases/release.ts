import type {release} from './data.js'

import {releases} from './data.js'

const getNewerVersions = (current: release): Array<release> =>
  releases
    .filter(release => release.major === current.major)
    .filter(release => release.minor === current.minor)
    .filter(release => release.patch > current.patch)

const updateNotice = (release: release) => {
  const latest = [...getNewerVersions(release)].shift()
  return !latest
    ? ``
    : `
:::info Updates available

There are patches available for [this release](https://bud.js.org/releases/tags/${latest.major}-${latest.minor}). Please update to [${latest.semver}](https://bud.js.org/releases/${latest.semver}).

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
