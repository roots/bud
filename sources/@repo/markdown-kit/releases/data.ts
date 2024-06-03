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

// eslint-disable-next-line
const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

/**
 * Release cache
 */
const releases: Array<release> = []

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
  const [major, minor, patch] = semver.split(`.`).map(parseVersion)

  if (
    fs.exists(
      path(
        `sources/@repo/docs/content/releases`,
        `${major}.${minor}.${patch}.md`,
      ),
    )
  )
    return null

  const [introLine, ...bodyLines] = release.body.split(`\n`)
  const intro = introLine.trim() ?? ``
  const body = bodyLines
    .join(`\n`)
    .trim()
    .replaceAll(/\<(details|summary)\>/g, `<$1>\n`)
    .replaceAll(/\<\/(details|summary)\>/g, `\n</$1>`)

  return {
    ...release,
    body,
    intro,
    major,
    minor,
    patch,
    semver,
    tags: `[release, ${major}, ${major}.${minor}]`,
  }
}

/**
 * Request cache
 */
const request: request = await octokit.request(
  `GET /repos/roots/bud/releases?100,1`,
  {
    owner: `roots`,
    repo: `bud`,
  },
)

if (request.data) {
  releases.push(
    ...request.data
      ?.filter(filter)
      .map(parse)
      .filter(Boolean)
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

  const data =
    (await fs.readAsync(
      path(`sources/@repo/docs/content/releases/data.json`),
      `json`,
    )) ?? []

  releases && data.push(...releases)

  await fs.writeAsync(
    path(`sources/@repo/docs/content/releases/data.json`),
    data,
    {jsonIndent: 2},
  )
}

export {releases}
export type {release}
