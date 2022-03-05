Compile and serve source assets

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud dev

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --cache                        Utilize filesystem cache
  --cacheType,--cache.type #0    Type of cache
  --clean                        Clean artifacts and distributables prior to compilation
  --devtool                      Set devtool
  --hash                         Hash compiled files
  --html                         Generate an html template
  --project #0                   Project directory
  --input,-i #0                  Source directory (relative to project)
  --output,-o #0                 Distribution directory (relative to project)
  --storage #0                   Storage/cache directory (relative to project)
  --log                          Enable logging
  --logLevel,--log.level #0      Set logging level
  --manifest                     Generate a manifest of compiled assets
  --minimize                     Minimize compiled assets
  --publicPath #0                public path of emitted assets
  --splitChunks,--vendor         Separate vendor bundle
  --target,-t #0                 Limit compilation to particular compilers

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start dev server and compile assets in dev mode
  $ bud dev