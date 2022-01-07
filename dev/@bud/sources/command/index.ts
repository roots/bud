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
import {ProxyConfig} from './proxy/config.command'
import {ProxyDelete} from './proxy/delete.command'
import {ProxyMake} from './proxy/make.command'
import {ProxyPublish} from './proxy/publish.command'
import {ProxyRemake} from './proxy/remake.command'
import {ProxyRestart} from './proxy/restart.command'
import {ProxyStart} from './proxy/start.command'
import {ProxyStop} from './proxy/stop.command'
import {Release} from './release.command'
import {Test} from './test.command'

export const Commands = {
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
  ProxyConfig,
  ProxyDelete,
  ProxyMake,
  ProxyPublish,
  ProxyRemake,
  ProxyRestart,
  ProxyStart,
  ProxyStop,
  Test,
  Release,
}
