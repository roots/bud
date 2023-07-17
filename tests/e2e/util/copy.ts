import {path} from '@repo/constants'
import fs from 'fs-jetpack'

export const sourcePath = (...parts: Array<string>) =>
  path(`examples`, ...parts)

export const destinationPath = (...parts: Array<string>) =>
  path(`storage`, `fixtures`, ...parts)

export const copyDir = async (dir: string) => {
  try {
    await fs.removeAsync(destinationPath(dir))
    await fs.copyAsync(sourcePath(dir), destinationPath(dir), {
      overwrite: true,
    })
  } catch (error) {
    throw error
  }
}

export const copyOriginalSource = async (dir: string) => {
  try {
    await fs.copyAsync(
      sourcePath(dir, `src`),
      destinationPath(dir, `src`),
      {
        overwrite: true,
      },
    )
  } catch (error) {
    throw error
  }
}

export const overwriteJson = async (dir: string) => {
  const packageJson = await fs.readAsync(
    destinationPath(dir, `package.json`),
    `json`,
  )

  if (!packageJson) throw new Error(`No package.json found`)
  if (!packageJson?.devDependencies) packageJson.devDependencies = {}

  packageJson.devDependencies = Object.entries(
    packageJson?.devDependencies,
  ).reduce(
    (json, [key, value]) => ({
      ...json,
      [key]: (value as string).replace(`workspace:*`, `latest`),
    }),
    {},
  )

  await fs.writeAsync(destinationPath(dir, `package.json`), packageJson)
}
