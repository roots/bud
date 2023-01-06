/* eslint-disable n/no-process-env */
import {join} from 'node:path'

import {Octokit} from '@octokit/core'
import {paginateRest} from '@octokit/plugin-paginate-rest'
import {paths} from '@repo/constants'
import {json, yml} from '@roots/bud-support/filesystem'
import fs from '@roots/bud-support/fs-jetpack'
import sortBy from '@roots/bud-support/lodash/sortBy'

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
            contributors: contributors.map(({name, email, url}) => ({
              name,
              email,
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
    `GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}`,
    {
      owner: `roots`,
      repo: `bud`,
      path,
      per_page: 100,
    },
    response => {
      response?.data?.map(commit => {
        if (!commit.author?.login) return
        if (commit.author.login.includes(`bot`)) return

        contributors[commit.author.login] = {
          ...(contributors[commit.author.login] ?? {}),
          name: commit.commit.author.name,
          login: commit.author.login,
          avatar: commit.author.avatar_url,
          url: commit.author.html_url,
          contributions:
            (contributors[commit.author.login]?.contributions ?? 0) + 1,
        }

        if (
          commit.commit.author.email &&
          !commit.commit.author.email.includes(`noreply`)
        ) {
          contributors[commit.author.login].email =
            commit.commit.author.email
        }
      })
    },
  )

  return sortBy(contributors, `contributions`).reverse()
}
