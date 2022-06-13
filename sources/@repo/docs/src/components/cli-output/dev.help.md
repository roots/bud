Compile and serve source assets

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud dev

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --cache                   Utilize compiler's filesystem cache
  --clean                   Clean artifacts and distributables prior to compilation
  --ci                      Simple build summaries for CI
  --debug                   Enable debugging mode. Very verbose logging. Writes output files to `@storage` directory
  --devtool #0              Set devtool option
  --output,-o #0            Distribution directory (relative to project)
  --esm                     build as es modules
  --immutable               bud.http: immutable module lockfile
  --flush                   Force clearing bud internal cache
  --hash                    Hash compiled filenames
  --html                    Generate an html template
  --input,-i #0             Source directory (relative to project)
  --storage #0              Storage directory (relative to project)
  --indicator               Enable development status indicator
  --log                     Enable logging
  --manifest                Generate a manifest of compiled assets
  --minimize                Minimize compiled assets
  --modules #0              Module resolution path
  --notify                  Enable notfication center messages
  --browser                 Open browser on successful development build
  --editor                  Open editor to file containing errors on unsuccessful development build
  --overlay                 Enable error overlay in development mode
  --publicPath #0           public path of emitted assets
  --splitChunks,--vendor    Separate vendor bundle
  --target,-t #0            Limit compilation to particular compilers
  --verbose                 Set logging level

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start dev server and compile assets in dev mode
  $ bud dev