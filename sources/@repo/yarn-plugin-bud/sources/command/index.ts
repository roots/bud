import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {Docs} from './docs.command'
import {Eslint} from './lint/eslint.command'
import {Prettier} from './lint/prettier.command'
import {Skypack} from './lint/skypack.command'
import {Syncpack} from './lint/syncpack.command'
import {Make} from './make.command'
import {Preinstall} from './preinstall.command'
import {Release} from './release.command'
import {Test} from './test.command'
import {Tsc} from './tsc.command'
import {Vendor} from './vendor.command'
import {Version} from './version.command'

export const Commands = {
  Clean,
  Compile,
  Dev,
  Docs,
  Eslint,
  Prettier,
  Make,
  Release,
  Skypack,
  Syncpack,
  Test,
  Vendor,
  Preinstall,
  Tsc,
  Version,
}
