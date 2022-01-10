import globby from 'globby'
import * as execa from 'execa'
import {readJsonSync, writeFile, writeFileSync} from 'fs-extra'
import {IncomingMessage} from 'http'
import * as https from 'https'
import {format} from 'prettier'

import {manifest} from '../../package.json'

require('dotenv').config()

const TOKEN =
  process.env.GH_ACCESS_TOKEN ||
  process.argv
    .slice(2)
    .filter(arg => arg.startsWith('token='))
    .pop()
    .replace('token=', '')

const packages = async (user: any) => {
  if (user.login.includes('bot') || user.login.includes('Bot')) {
    return []
  }

  const list = await globby(`workspaces/@roots/*`, {
    absolute: false,
    cwd: process.cwd(),
    onlyFiles: false,
  })

  return (
    list
      .map((pkg: string) => {
        const res = execa.sync('git', [
          'shortlog',
          'HEAD',
          '-s',
          '-n',
          '-e',
          pkg,
        ])

        if (
          res.stdout.includes(user.email) ||
          res.stdout.includes(user.login) ||
          res.stdout.includes(user.name)
        ) {
          return pkg.replace('packages/', '')
        } else {
          return false
        }
      })
      .filter(Boolean) ?? []
  )
}

const makeOptions = (
  user: string,
): Partial<https.RequestOptions> => ({
  host: 'api.github.com',
  method: 'GET',
  path: `/users/${user}`,
  headers: {
    Authorization: `token ${TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': `roots/bud`,
  },
})

const curryRequestCb =
  (user: string): ((res: IncomingMessage) => void) =>
  async res => {
    let buffer: string

    res.setEncoding('utf8')
    res.on('data', (chunk: string): void => {
      buffer = `${buffer}${chunk}`
    })
    res.on('end', async (): Promise<void> => {
      const userData = JSON.parse(buffer)

      userData.contributions = await packages(userData)

      if (userData.contributions.length > 0) {
        userData.contributions.map(pkgPath => {
          const filePath = `${process.cwd()}/packages/${pkgPath}/package.json`

          const pkgJson = readJsonSync(filePath)

          pkgJson.contributors = [
            ...(pkgJson.contributors?.filter(
              ({name}) =>
                name !== userData.name &&
                name !== userData.login,
            ) ?? []),
            {
              name: `${userData.login}`,
              url: `${userData.html_url}`,
            },
          ]

          writeFileSync(
            filePath,
            format(JSON.stringify(pkgJson), {
              parser: 'json',
              printWidth: 40,
            }),
          )
        })
      }

      await writeFile(
        process
          .cwd()
          .concat(`/site/static/data/contributors/${user}.json`),
        format(JSON.stringify(userData), {
          parser: 'json',
          printWidth: 40,
        }),
      )
    })

    await execa('yarn')
  }

Object.entries(manifest.contributors).map(([user]) => {
  const options = makeOptions(user)
  const callback = curryRequestCb(user)

  https.request(options, callback).end()
})
