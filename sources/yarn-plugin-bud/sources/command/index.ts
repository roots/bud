import {AuthNpm} from './auth/npm.command'
import {AuthProxy} from './auth/proxy.command'
import {AuthReset} from './auth/reset.command'
import {Bud} from './bud.command'
import {Build} from './build.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {ContainerBud} from './container/bud.command'
import {ContainerDown} from './container/down.command'
import {ContainerRun} from './container/run.command'
import {ContainerBash} from './container/bash.command'
import {ContainerUp} from './container/up.command'
import {Docs} from './docs.command'
import {Lint} from './lint.command'
import {Make} from './make.command'
import {Publish} from './publish.command'
import {ReleaseNpm} from './release/npm.command'
import {ReleaseProxy} from './release/proxy.command'
import {Test} from './test.command'
import {Version} from './version.command'

export const Commands = {
  AuthNpm,
  AuthProxy,
  AuthReset,
  Bud,
  Build,
  Clean,
  Compile,
  ContainerBud,
  ContainerDown,
  ContainerRun,
  ContainerBash,
  ContainerUp,
  Docs,
  Lint,
  Make,
  Publish,
  ReleaseNpm,
  ReleaseProxy,
  Test,
  Version,
}
