import {Build} from './build.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {ContainerBud} from './container/bud.command'
import {ContainerDown} from './container/down.command'
import {ContainerRun} from './container/run.command'
import {ContainerUp} from './container/up.command'
import {Dev} from './dev.command'
import {Docs} from './docs.command'
import {Lint} from './lint.command'
import {Make} from './make.command'
import {Publish} from './publish.command'
import {ReleaseNpm} from './release/npm.command'
import {ReleaseProxy} from './release/proxy.command'
import {Test} from './test.command'
import {Version} from './version.command'

export const Commands = {
  Build,
  Clean,
  Compile,
  ContainerBud,
  ContainerDown,
  ContainerRun,
  ContainerUp,
  Dev,
  Docs,
  Lint,
  Make,
  Publish,
  ReleaseNpm,
  ReleaseProxy,
  Test,
  Version,
}
