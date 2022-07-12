import {Bud} from './bud.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {DocsDev} from './docs/dev.command'
import {Docs} from './docs/docs.command'
import {DocsNetlify} from './docs/netlify.command'
import {Info} from './info.command'
import {Lint} from './lint.command'
import {LintDependencies} from './lint/dependencies.command'
import {LintExports} from './lint/exports.command'
import {Format} from './lint/format.command'
import {RegistryInstall} from './registry/install.command'
import {Pm2} from './registry/pm2.command'
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
  DocsNetlify,
  Format,
  Info,
  Lint,
  LintDependencies,
  LintExports,
  Pm2,
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
