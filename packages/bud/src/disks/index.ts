import {Bud} from '@roots/bud-typings'

export const disks = (bud: Bud): {[key: string]: unknown} => ({
  ['@roots']: {
    baseDir: bud.fs.path.resolve(__dirname, '../../../'),
    glob: ['**/*'],
  },
  ['project']: {
    baseDir: bud.fs.getBase(),
    glob: ['**/*'],
  },
})
