diagnose issues

USAGE
  $ bud doctor [-h] [--version] [--log] [--log.level v|vv|vvv|vvvv]
    [--log.papertrail] [--log.min] [--log.secret <value>]

FLAGS
  -h, --help               Show CLI help.
  --[no-]log               log to console
  --log.level=<option>     [default: vvv] set log verbosity. `v` is error level.
                           `vv` is warning level. `vvv` is log level. `vvvv` is
                           debug level.
                           <options: v|vv|vvv|vvvv>
  --[no-]log.min           remove formatting from logged objects
  --[no-]log.papertrail    preserve logger output
  --log.secret=<value>...  [default: [REDACTED]/source
                           s/@repo/markdown-kit] hide matching strings from
                           logging output
  --version                Show CLI version.

DESCRIPTION
  diagnose issues

EXAMPLES
  $ bud doctor