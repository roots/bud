install peer dependencies

USAGE
  $ bud install [-h] [--version] [--log.level v|vv|vvv|vvvv]
    [--log.min] [--log.secret <value>]

FLAGS
  -h, --help               Show CLI help.
  --log.level=<option>     [default: vvv] set log verbosity. `v` is error level.
                           `vv` is warning level. `vvv` is log level. `vvvv` is
                           debug level.
                           <options: v|vv|vvv|vvvv>
  --[no-]log.min           remove formatting from logged objects
  --log.secret=<value>...  [default: [REDACTED]/source
                           s/@repo/markdown-kit] hide matching strings from
                           logging output
  --version                Show CLI version.

DESCRIPTION
  install peer dependencies

ALIASES
  $ bud init

EXAMPLES
  $ bud install