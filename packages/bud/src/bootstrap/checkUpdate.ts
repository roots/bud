import updateNotifier from 'update-notifier'
import BudInterface from '../Bud'

const checkUpdate = function (this: BudInterface): unknown {
  return updateNotifier({
    pkg: this.disks.get('@roots').readJson('bud/package.json'),
    distTag: 'next',
    shouldNotifyInNpmScript: true,
  }).notify({
    defer: true,
  })
}

export = checkUpdate
