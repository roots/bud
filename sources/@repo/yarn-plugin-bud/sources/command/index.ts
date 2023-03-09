import {Bud} from './bud.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {Dev} from './dev.command'
import {DocsDev} from './docs/dev.command'
import {Docs} from './docs/docs.command'
import {DocsNetlify} from './docs/netlify.command'
import {Format} from './format.command'
import {Lint} from './lint.command'
import {LintDependencies} from './lint/dependencies.command'
import {LintExports} from './lint/exports.command'
import {Plugin} from './plugin.rebuild.command'
import {Pm2} from './pm2.command'
import {RegistryClean} from './registry/clean.command'
import {RegistryStart} from './registry/start.command'
import {RegistryStop} from './registry/stop.command'
import {Release} from './release.command'
import {TestRun} from './test.command'
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
  Lint,
  LintDependencies,
  LintExports,
  Plugin,
  Pm2,
  RegistryClean,
  RegistryStart,
  RegistryStop,
  Release,
  TestRun,
  Tsc,
  Vendor,
  Version,
}
