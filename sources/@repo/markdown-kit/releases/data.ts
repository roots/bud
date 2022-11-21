import {Octokit} from 'octokit'

interface ghRelease {
  published_at: string
  tag_name: string
  author: {
    html_url: string
    avatar_url: string
    login: string
  }
  body: string
}

interface release extends ghRelease {
  major: number
  minor: number
  patch: number
  semver: string
  intro: string
  tags: string
}

interface request {
  data?: Array<ghRelease>
  error?: Error
}

type releases = Array<release>

// eslint-disable-next-line
const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

const filter = (release: ghRelease) => {
  if (release.tag_name.length !== 6) return false
  return true
}

const parseVersion = (version?: string) =>
  typeof version !== `undefined` ? parseInt(version) : 0

const parse = (release: ghRelease): release => {
  const semver = release.tag_name.replace(`v`, ``)
  const [major, minor, patch] = semver.split(`.`)

  return {
    ...release,
    major: parseVersion(major),
    minor: parseVersion(minor),
    patch: parseVersion(patch),
    semver,
    tags: `[release, ${major}, ${major}.${minor}]`,
    intro: release.body.split(`\n`).shift().trim().trim(),
    body: release.body.split(`\n`).slice(1).join(`\n`).trim(),
  }
}

let request: {data: Array<ghRelease>}
if (!request?.data)
  request = await octokit.request(`GET /repos/roots/bud/releases?100,1`, {
    owner: `roots`,
    repo: `bud`,
  })

let releases = []
if (!releases) releases = request.data.filter(filter).map(parse)

export {releases, release}
