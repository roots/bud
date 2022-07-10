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
import {RegistryInstall} from './registry/install.command'
import {RegistryStart} from './registry/start.command'
import {RegistryStop} from './registry/stop.command'
import {Release} from './release.command'
import {TestRun} from './test/run.command'
import {TestSetup} from './test/setup.command'
import {TestTeardown} from './test/teardown.command'
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
  RegistryInstall,
  RegistryStart,
  RegistryStop,
  Release,
  TestRun,
  TestSetup,
  TestTeardown,
  Tsc,
  Vendor,
  Version,
}
