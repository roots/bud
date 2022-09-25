Compiles source assets in `development` mode.

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud build development

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --input,-i,--@src,--src #0       Source directory (relative to project)
  --output,-o,--@dist,--dist #0    Distribution directory (relative to project)
  --notify                         Enable notfication center messages
  --cache                          Utilize compiler's filesystem cache
  --ci                             Simple build summaries for CI
  --clean                          Clean artifacts and distributables prior to compilation
  --debug                          Write debug files to storage directory
  --devtool #0                     Set devtool option
  --editor                         Open editor to file containing errors on unsuccessful development build
  --esm                            build as es modules
  --flush                          Force clearing bud internal cache
  --hash                           Hash compiled filenames
  --html                           Generate an html template
  --immutable                      bud.http: immutable module lockfile
  --manifest                       Generate a manifest of compiled assets
  --minimize                       Minimize compiled assets
  --publicPath #0                  public path of emitted assets
  --splitChunks,--vendor           Separate vendor bundle
  --storage #0                     Storage directory (relative to project)
  --browser                        Open browser on successful development build.
  --indicator                      Enable development status indicator
  --overlay                        Enable error overlay in development mode
  --reload                         Reload browser on unrecoverable error

━━━ Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`bud build development` compiles source assets in `development` mode.

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

compile source and serve
  $ bud build development

open project in system default browser
  $ bud build development --browser

do not force reload in the browser when encountering a fatal HMR error
  $ bud build development --no-reload

do not display an error overlay when encountering errors in application code
  $ bud build development --no-overlay