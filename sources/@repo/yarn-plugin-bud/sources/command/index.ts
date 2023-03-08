import {Bud} from './bud.command'
import {CI} from './ci.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {DocsDev} from './docs/dev.command'
import {Docs} from './docs/docs.command'
import {DocsNetlify} from './docs/netlify.command'
import {Format} from './format.command'
import {Info} from './info.command'
import {Lint} from './lint.command'
import {LintDependencies} from './lint/dependencies.command'
import {LintExports} from './lint/exports.command'
import {RegistryClean} from './registry/clean.command'
import {RegistryInstall} from './registry/install.command'
import {Pm2} from './registry/pm2.command'
import {RegistryStart} from './registry/start.command'
import {RegistryStop} from './registry/stop.command'
import {Release} from './release.command'
import {RunCommand} from './run.command'
import {TestRun} from './test/test.command'
import {TestE2E} from './test/test.e2e.command'
import {TestIntegration} from './test/test.integration.command'
import {TestUnit} from './test/test.unit.command'
import {Tsc} from './tsc.command'
import {Vendor} from './vendor.command'
import {Version} from './version.command'

export const Commands = {
  Bud,
  Clean,
  CI,
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
  RegistryClean,
  RegistryInstall,
  RegistryStart,
  RegistryStop,
  Release,
  RunCommand,
  TestE2E,
  TestIntegration,
  TestUnit,
  TestRun,
  Tsc,
  Vendor,
  Version,
}
