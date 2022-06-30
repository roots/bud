import {Build} from './build.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {Docs} from './docs.command'
import {Eslint} from './lint/eslint.command'
import {Lint} from './lint/lint.command'
import {Prettier} from './lint/prettier.command'
import {Syncpack} from './lint/syncpack.command'
import {Make} from './make.command'
import {Publish} from './publish.command'
import {Release} from './release.command'
import {Test} from './test.command'
import {Vendor} from './vendor.command'
import {Verdaccio} from './verdaccio.command'
import {Version} from './version.command'

export const Commands = {
  Build,
  Clean,
  Compile,
  Dev,
  Docs,
  Lint,
  Eslint,
  Prettier,
  Make,
  Publish,
  Release,
  Syncpack,
  Test,
  Vendor,
  Verdaccio,
  Version,
}
