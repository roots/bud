import {AuthProxy} from './auth/proxy.command'
import {AuthNpm} from './auth/npm.command'
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
import {ProxyPublish} from './proxy/publish.command'
import {Publish} from './publish.command'
import {Release} from './release.command'
import {Test} from './test.command'
import {Version} from './version.command'

export const Commands = {
  AuthProxy,
  AuthNpm,
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
  ProxyPublish,
  Publish,
  Test,
  Release,
  Version,
}
