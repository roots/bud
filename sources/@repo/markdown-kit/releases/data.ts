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
let request: request
/**
 * Release cache
 */
let releases: Array<release>

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
    intro: release.body.split(`\n`).shift().trim().trim(),
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
if (!releases) releases = request?.data?.filter(filter).map(parse)

export {releases}
export type {release}
