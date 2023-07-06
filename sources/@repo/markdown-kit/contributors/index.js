/* eslint-disable n/no-process-env */
import {join} from 'path'

import {Octokit} from '@octokit/core'
import {paginateRest} from '@octokit/plugin-paginate-rest'
import {paths} from '@repo/constants'
import {json, yml} from '@roots/bud-support/filesystem'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import sortBy from '@roots/bud-support/lodash/sortBy'
import fs from 'fs-jetpack'

import ignoredCommits from './ignored_sha.js'

let {root, sources} = paths

const octokit = new (Octokit.plugin(paginateRest))({
  auth: process.env.GITHUB_TOKEN,
})

await yml.write(
  join(root, `contributors.yml`),
  await getContributorsFromCommits(),
)

await fs.listAsync(join(sources, `@roots`)).then(
  async signifiers =>
    await signifiers
      .map(signifier => join(`@roots`, signifier))
      .reduce(async (promised, signifier) => {
        await promised

        const pkgPath = join(sources, signifier)
        const jsonPath = join(pkgPath, `package.json`)
        const ymlPath = join(pkgPath, `contributors.yml`)

        const contributors = await getContributorsFromCommits(
          join(`sources`, signifier),
        )

        // eslint-disable-next-line no-console
        console.log(signifier, contributors.length, `contributors`)

        try {
          const pkgJson = await json.read(jsonPath)

          await json.write(jsonPath, {
            ...pkgJson,
            contributors: contributors.map(({email, name, url}) => ({
              email,
              name,
              url,
            })),
          })
        } catch (e) {}

        await yml.write(ymlPath, contributors)
      }, Promise.resolve()),
)

async function getContributorsFromCommits(path) {
  let contributors = {}

  await octokit.paginate(
    `GET /repos/{owner}/{repo}/commits{?sha,path,author,tag,since,until,per_page,page}`,
    {
      owner: `roots`,
      path,
      per_page: 100,
      repo: `bud`,
    },
    response => {
      response?.data
        ?.filter(({sha}) => !ignoredCommits.includes(sha))
        .filter(({author}) => !isUndefined(author?.login))
        .filter(({author}) => !author.login.includes(`bot`))
        .filter(({commit}) => {
          const message = commit.message.split(`\n`).shift()
          return (
            !message.startsWith(`chore`) && !message.startsWith(`🧹 chore`)
          )
        })
        .map(({author, commit}) => {
          /* eslint-disable perfectionist/sort-objects */
          contributors[author.login] = {
            ...(contributors[author.login] ?? {}),
            name: commit.author.name,
            login: author.login,
            avatar: author.avatar_url,
            url: author.html_url,
            contributions:
              (contributors[author.login]?.contributions ?? 0) + 1,
          }

          if (
            commit.author?.email &&
            !commit.author.email.includes(`noreply`)
          )
            contributors[author.login].email = commit.author.email
        })
    },
  )

  return sortBy(contributors, `contributions`).reverse()
}
