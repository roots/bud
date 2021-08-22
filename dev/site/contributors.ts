import {writeJsonSync} from 'fs-extra'
import * as gh from 'octonode'

import {manifest} from '../../package.json'

const client = gh.client()

Object.entries(manifest.contributors).map(([user, groups]) => {
  client.get(
    `/users/${user}`,
    {},
    (_err, _status, body, _headers) => {
      console.log(body)

      writeJsonSync(
        process
          .cwd()
          .concat(`/site/static/contributors/${user}.json`),
        body,
      )
    },
  )
})
