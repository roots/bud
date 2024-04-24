import { sep } from 'node:path'

import {bud} from '@roots/bud'

const path = bud.path(`..`, `..`, `..`, `.git`, `HEAD`)

const head = (await bud.fs.read(path))
  ?.toString()
  .split(sep)
  .pop()
  .trim()

bud.fs
  .setCredentials({
    accessKeyId: bud.env.get(`AWS_ACCESS_KEY_ID`),
    secretAccessKey: bud.env.get(`AWS_SECRET_ACCESS_KEY`),
  })
  .setRegion(`us-west-2`)
  .setBucket(`bud-js-tests`)
  .upload({
    destination: head,
    keep: 2,
  })
