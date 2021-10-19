import execa from 'execa'
import {readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

const segments = process.argv.slice(2)

enum FLAG {
  VERSION = '--version',
  TAG = '--tag',
  VERDACCIO = '--verdaccio',
  PUBLISH = '--publish',
}

const hasFlag = (flag: FLAG) => segments.includes(flag)
const getFlag = (flag: FLAG) => segments[flag].split('=').pop()
const isDirty = async () => {
  const {stdout} = await execa('git', ['status', '--porcelain'])
  return stdout.length > 0
}

async function main() {
  const dirty = await isDirty()
  if (dirty) {
    // eslint-disable-next-line no-console
    console.error('Cannot tag with uncommitted changes.')
    process.exit(1)
  }

  if (!hasFlag(FLAG.VERSION)) {
    // eslint-disable-next-line no-console
    console.error('Missing --version flag.')
    process.exit(1)
  }

  if (hasFlag(FLAG.VERDACCIO)) {
    await $(`npm set registry http://localhost:4873`)
    await $(`yarn config set registry http://localhost:4873`)
  }

  await $('yarn kjo make')
  await $('yarn install')
  await $(
    `yarn workspaces foreach --no-private exec npm version ${getFlag(
      FLAG.VERSION,
    )}`,
  )

  const projectJson = await readJson(
    process.cwd().concat('/package.json'),
  )
  projectJson.version = getFlag(FLAG.VERSION)

  await writeFile(
    process.cwd().concat('/package.json'),
    format(JSON.stringify(projectJson, null, 2), {
      parser: 'json',
    }),
  )

  if (hasFlag[FLAG.PUBLISH]) {
    hasFlag[FLAG.TAG]
      ? await $(
          `yarn workspaces foreach --no-private npm publish --access public --tag ${getFlag(
            FLAG.TAG,
          )}`,
        )
      : await $(
          `yarn workspaces foreach --no-private npm publish --access public`,
        )
  }
}

async function $(cmd: string) {
  const parts: [string, Array<string>] = cmd
    .split(' ')
    .reduce((a: [string, Array<string>], v: string, i) => {
      if (i === 0) a = [v, []]
      else a[1].push(v)
      return a
    }, null)

  const out = execa(...parts)
  out.stdout.pipe(process.stdout)
  out.stderr.pipe(process.stderr)
}

main()
