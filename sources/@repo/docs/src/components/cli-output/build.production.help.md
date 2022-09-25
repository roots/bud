Compiles source assets in `production` mode.

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud build production

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

━━━ Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`bud build production` compiles source assets in `production` mode.

If you run this command without a bud configuration file `bud` will look for an 
entrypoint at `@src/index.js`.

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

compile source assets
  $ bud build