import {Bud} from './bud.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {DocsDev} from './docs/dev.command'
import {Docs} from './docs/docs.command'
import {Lint} from './lint.command'
import {LintDependencies} from './lint/dependencies.command'
import {LintExports} from './lint/exports.command'
import {Format} from './lint/format.command'
import {RegistryStart} from './registry/start.command'
import {RegistryStop} from './registry/stop.command'
import {Release} from './release.command'
import {Test} from './test.command'
import {Tsc} from './tsc.command'
import {Vendor} from './vendor.command'
import {Version} from './version.command'

export const Commands = {
  Bud,
  Clean,
  Compile,
  Dev,
  Docs,
  DocsDev,
  Format,
  Lint,
  LintDependencies,
  LintExports,
  RegistryStart,
  RegistryStop,
  Release,
  Test,
  Tsc,
  Vendor,
  Version,
}
