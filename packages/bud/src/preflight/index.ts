import {checkModeIsValid} from './checkModeIsValid'
import {filesystemSetup} from './filesystemSetup'
import {parseArguments} from './parseArguments'

export const preflight = function (bud: Framework.Bud): void {
  filesystemSetup.bind(bud)()
  parseArguments.bind(bud)()

  if (bud.args.has('mode')) {
    checkModeIsValid(bud.args.get('mode'))
    bud.mode.set(bud.args.get('mode'))
  } else {
    bud.mode.set('none')
  }
}
