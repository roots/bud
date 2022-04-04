import {Build} from './build.command'
import {Clean} from './clean.command'
import {Compile} from './compile.command'
import {ContainerDown} from './container/down.command'
import {ContainerUp} from './container/up.command'
import {Dev} from './dev.command'
import {Docs} from './docs.command'
import {Lint} from './lint.command'
import {Make} from './make.command'
import {Publish} from './publish.command'
import {Release} from './release.command'
import {Test} from './test.command'
import {Vendor} from './vendor.command'
import { Version } from './version.command'

export const Commands = {
  Build,
  Clean,
  Compile,
  ContainerDown,
  ContainerUp,
  Dev,
  Docs,
  Lint,
  Make,
  Publish,
  Release,
  Test,
  Vendor,
  Version,
}
