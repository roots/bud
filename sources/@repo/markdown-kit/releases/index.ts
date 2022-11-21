// @ts-check

import {join} from 'node:path/posix'

import {paths} from '@repo/constants'
import fs from '@roots/bud-support/fs-jetpack'
import {Octokit} from 'octokit'

// @ts-ignore
const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})
const results = await octokit.request(
  `GET /repos/roots/bud/releases?100,1`,
  {
    owner: `roots`,
    repo: `bud`,
  },
)

const filterData = data => {
  if (data.tag_name.length !== 6) return false
  return true
}

const formatData = data => {
  const semver = data.tag_name.replace(`v`, ``)
  const [major, minor, patch] = semver.split(`.`)

  data.body = data.body
    .split(`\n`)
    .filter(line => !line.startsWith(`[Read the release notes on`))
    .join(`\n`)

  return {
    ...data,
    major: major ?? 0,
    minor: minor ?? 0,
    patch: patch ?? 0,
    semver,
    tags: `[release, ${major}, ${major}.${minor}]`,
    intro: data.body.split(`\n`).shift().trim(),
    body: data.body.split(`\n`).slice(1).join(`\n`).trim(),
  }
}

const releaseBody = (release, update) =>
  `---
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
${
  update
    ? `
:::info Updates available

There are patches available for [this release](https://bud.js.org/releases/tags/${release.major}-${release.minor}). Please update to [${update.semver}](https://bud.js.org/releases/${update.semver}).

:::`
    : ``
}

${release.body}
`
const releasePath = semver =>
  join(
    paths.sources,
    `@repo`,
    `docs`,
    `content`,
    `releases`,
    `${semver}.mdx`,
  )

const releases = results.data.filter(filterData).map(formatData)

const latest = release => {
  return releases
    .filter(({major}) => major === release.major)
    .filter(({minor}) => minor === release.minor)
    .filter(({patch}) => patch > release.patch)
    .pop()
}

await Promise.all(
  releases.map(
    async release =>
      await fs.writeAsync(
        releasePath(release.semver),
        releaseBody(release, latest(release)).trim(),
      ),
  ),
)
