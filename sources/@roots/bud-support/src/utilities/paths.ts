import {createHash} from 'node:crypto'
import {join} from 'node:path'

import envPaths from 'env-paths'

import {BudError} from '../errors/errors.js'
import args from './args.js'
import * as env from './env.js'

const systemPaths = envPaths(`bud`)

interface paths {
  basedir: string
  hash: string
  /**
	Directory for data files.

	Example locations (with the default `nodejs` suffix):

	- macOS: `~/Library/Application Support/MyApp-nodejs`
	- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Data` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Data`)
	- Linux: `~/.local/share/MyApp-nodejs` (or `$XDG_DATA_HOME/MyApp-nodejs`)
	*/
  readonly data: string

  /**
	Directory for data files.

	Example locations (with the default `nodejs` suffix):

	- macOS: `~/Library/Preferences/MyApp-nodejs`
	- Windows: `%APPDATA%\MyApp-nodejs\Config` (for example, `C:\Users\USERNAME\AppData\Roaming\MyApp-nodejs\Config`)
	- Linux: `~/.config/MyApp-nodejs` (or `$XDG_CONFIG_HOME/MyApp-nodejs`)
	*/
  readonly config: string

  /**
	Directory for non-essential data files.

	Example locations (with the default `nodejs` suffix):

	- macOS: `~/Library/Caches/MyApp-nodejs`
	- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Cache` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Cache`)
	- Linux: `~/.cache/MyApp-nodejs` (or `$XDG_CACHE_HOME/MyApp-nodejs`)
	*/
  readonly cache: string

  /**
	Directory for log files.

	Example locations (with the default `nodejs` suffix):

	- macOS: `~/Library/Logs/MyApp-nodejs`
	- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Log` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Log`)
	- Linux: `~/.local/state/MyApp-nodejs` (or `$XDG_STATE_HOME/MyApp-nodejs`)
	*/
  readonly log: string

  /**
	Directory for temporary files.

	Example locations (with the default `nodejs` suffix):

	- macOS: `/var/folders/jf/f2twvvvs5jl_m49tf034ffpw0000gn/T/MyApp-nodejs`
	- Windows: `%LOCALAPPDATA%\Temp\MyApp-nodejs` (for example, `C:\Users\USERNAME\AppData\Local\Temp\MyApp-nodejs`)
	- Linux: `/tmp/USERNAME/MyApp-nodejs`
	*/
  readonly temp: string
}

let paths: paths

const get = (directory?: string): paths => {
  if (paths) return paths

  if (!directory)
    throw new BudError(
      `paths: directory is required if paths not already initialized`,
      {
        props: {
          details: `This error is thrown when the paths utility is called without a directory argument and the paths have not already been initialized. This is most likely a problem with bud.js.`,
        },
      },
    )

  const basearg =
    args?.cwd ?? args?.basedir ?? env.get(directory)?.APP_BASE_PATH
  const basedir = basearg ? join(directory, basearg) : directory
  const hash = createHash(`sha1`).update(basedir).digest(`base64`)

  paths = {
    ...Object.entries(systemPaths).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: join(value, hash),
      }),
      {
        basedir,
        hash,
      } as paths,
    ),
  }

  return paths
}

export {get}
