import {Bud} from './bud.command'
import {Build} from './build.command'
import {Clean} from './clean.command'
import {Contributors} from './contributors.command'
import {Dev} from './dev.command'
import {Docs} from './docs.build.command'
import {DocsDev} from './docs.dev.command'
import {Lint} from './lint.command'
import {DocsNetlify} from './netlify.command'
import {Plugin} from './plugin.rebuild.command'
import {Pm2} from './pm2.command'
import {RegistryClean} from './registry.clean.command'
import {RegistryStart} from './registry.start.command'
import {RegistryStop} from './registry.stop.command'
import {Release} from './release.command'
import {TestRun} from './test.command'
import {Tsc} from './tsc.command'
import {Version} from './version.command'

export const Commands = {
  Bud,
  Build,
  Clean,
  Contributors,
  Dev,
  Docs,
  DocsDev,
  DocsNetlify,
  Lint,
  Plugin,
  Pm2,
  RegistryClean,
  RegistryStart,
  RegistryStop,
  Release,
  TestRun,
  Tsc,
  Version,
}
