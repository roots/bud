import {writeJson} from 'fs-extra'
import {IncomingMessage} from 'http'
import * as https from 'https'

import {manifest} from '../../package.json'

require('dotenv').config()

const TOKEN =
  process.env.GH_ACCESS_TOKEN ||
  process.argv
    .slice(2)
    .filter(arg => arg.startsWith('token='))
    .pop()
    .replace('token=', '')

const makeOptions = (
  user: string,
): Partial<https.RequestOptions> => ({
  host: 'api.github.com',
  method: 'GET',
  path: `/users/${user}`,
  headers: {
    Authorization: `token ${TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': `bud/v${manifest.version}`,
  },
})

const curryRequestCb =
  (user: string): ((res: IncomingMessage) => void) =>
  res => {
    let data = ``

    res.setEncoding('utf8')

    res.on('data', (chunk: string): void => {
      data = `${data}${chunk}`
    })

    res.on('end', async (): Promise<void> => {
      await writeJson(
        process
          .cwd()
          .concat(`/site/static/data/contributors/${user}.json`),
        JSON.parse(data),
      )
    })
  }

Object.entries(manifest.contributors).map(([user]) => {
  const options = makeOptions(user)
  const callback = curryRequestCb(user)

  https.request(options, callback).end()
})
