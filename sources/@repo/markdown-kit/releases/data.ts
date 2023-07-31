import {path} from '@repo/constants'
import fs from 'fs-jetpack'
import {Octokit} from 'octokit'

interface ghRelease {
  author: {
    avatar_url: string
    html_url: string
    login: string
  }
  body: string
  published_at: string
  tag_name: string
}

interface release extends ghRelease {
  intro: string
  major: number
  minor: number
  patch: number
  semver: string
  tags: string
}

interface request {
  data?: Array<ghRelease>
  error?: Error
}

type releases = Array<release>

/**
 * Request cache
 */
let request: request = {}

/**
 * Release cache
 */
const releases: Array<release> = []

// eslint-disable-next-line
const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

/**
 * Filter out older releases with weird titles
 */
const filter = ({tag_name}: ghRelease) => tag_name.startsWith(`v6`)

/**
 * Parse a version string to a number
 */
const parseVersion = (version?: string) =>
  typeof version !== `undefined` ? parseInt(version) : 0

/**
 * Parse a release object
 */
const parse = (release: ghRelease): release => {
  const semver = release.tag_name.replace(`v`, ``)
  const [major, minor, patch] = semver.split(`.`)

  return {
    ...release,
    body: release.body.split(`\n`).slice(1).join(`\n`).trim(),
    intro: release.body.split(`\n`).shift()?.trim() ?? ``,
    major: parseVersion(major),
    minor: parseVersion(minor),
    patch: parseVersion(patch),
    semver,
    tags: `[release, ${major}, ${major}.${minor}]`,
  }
}

if (!request?.data) {
  try {
    request = await octokit.request(
      `GET /repos/roots/bud/releases?100,1`,
      {
        owner: `roots`,
        repo: `bud`,
      },
    )
  } catch (error) {
    throw error
  }
}

if (request.data) {
  releases.push(
    ...request.data
      ?.filter(filter)
      .map(parse)
      .sort((a, b) => {
        if (a.major > b.major) return -1
        if (a.major < b.major) return 1
        return 0
      })
      .sort((a, b) => {
        if (a.minor > b.minor) return -1
        if (a.minor < b.minor) return 1
        return 0
      }),
  )

  await fs.writeAsync(
    path(`sources/@repo/docs/generated/releases/data.json`),
    releases,
    {jsonIndent: 2},
  )
}

export {releases}
export type {release}
