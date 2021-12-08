import {Bud} from './bud.command'
import {Build} from './build.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {DockerDown} from './docker/down.command'
import {DockerExec} from './docker/exec.command'
import {DockerUp} from './docker/up.command'
import {Docs} from './docs.command'
import {Lint} from './lint.command'
import {Make} from './make.command'
import {Proxy} from './proxy.command'
import {Test} from './test.command'

export const Commands = {
  Bud,
  Build,
  Clean,
  Compile,
  DockerDown,
  DockerExec,
  DockerUp,
  Docs,
  Lint,
  Make,
  Test,
  Proxy,
}
