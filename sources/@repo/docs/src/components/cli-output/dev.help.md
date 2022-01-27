compile assets

USAGE
  $ bud serve [-h] [--version] [--log] [--log.level v|vv|vvv|vvvv]
    [--log.papertrail] [--log.min] [--log.secret <value>] [--target <value>]
    [--location.src <value>] [--location.dist <value>] [--location.project
    <value>] [--location.publicPath <value>] [--location.storage <value>]
    [--location.modules <value>] [--cache] [--cache.type
    filesystem|memory|false] [--clean] [--config <value>] [--dashboard]
    [--devtool <value>] [--html] [--hash] [--inject] [--manifest] [--minimize]
    [--splitChunks] [--vendor] [--runtime]

FLAGS
  -h, --help                     Show CLI help.
  --[no-]cache                   cache built modules to the filesystem
  --cache.type=<option>          [default: filesystem]
                                 <options: filesystem|memory|false>
  --[no-]clean                   clean dist directory before compiling
  --config=<value>               path to config file
  --[no-]dashboard               enable bud dashboard
  --devtool=<value>              specify source-map type
  --[no-]hash                    hash compiled filenames
  --[no-]html                    generate an html template
  --[no-]inject                  automatically register & boot extensions
  --location.dist=<value>        distribution directory
  --location.modules=<value>     public path
  --location.project=<value>     repo root path
  --location.publicPath=<value>  public path
  --location.src=<value>         source directory
  --location.storage=<value>     storage directory
  --log
  --log.level=<option>           [default: vvv] set log verbosity. `v` is error
                                 level. `vv` is warning level. `vvv` is log
                                 level. `vvvv` is debug level.
                                 <options: v|vv|vvv|vvvv>
  --[no-]log.min                 remove formatting from logged objects
  --[no-]log.papertrail          preserve logger output
  --log.secret=<value>...        [default: /srv/mocks/yarn/babel] hide matching
                                 strings from logging output
  --[no-]manifest                emit manifest.json
  --[no-]minimize                minimize file size of compiled assets
  --[no-]runtime                 Create a runtime chunk
  --[no-]splitChunks             create separate chunks for vendor and app code
  --target=<value>...            [default: ] limit compilation to this compiler
  --[no-]vendor                  create separate chunks for vendor and app code;
                                 alias for splitChunks
  --version                      Show CLI version.

DESCRIPTION
  compile assets

ALIASES
  $ bud dev
  $ bud start

EXAMPLES
  $ bud serve --cache