import type {Filesystem} from '@roots/filesystem'

export default async function writePackageManifest(fs: Filesystem) {
  const {data} = await import(`../state.js`)

  process.stdout.write(`Writing package.json... \n`)

  await fs.write(`package.json`, data.package)

  if (data.pacman === `yarn`) {
    await fs.write(`yarn.lock`, ``)
  }
}
