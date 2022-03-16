Compile and serve source assets

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ @roots/bud dev

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --cache                   Utilize compiler's filesystem cache
  --ci                      Run in CI mode (disables keyboard input handlers).
  --clean                   Clean artifacts and distributables prior to compilation
  --devtool                 Set devtool option
  --flush                   Force clearing bud internal cache
  --hash                    Hash compiled filenames
  --html                    Generate an html template
  --input,-i #0             Source directory (relative to project)
  --output,-o #0            Distribution directory (relative to project)
  --storage #0              Storage directory (relative to project)
  --log                     Enable logging
  --verbose                 Set logging level
  --manifest                Generate a manifest of compiled assets
  --minimize                Minimize compiled assets
  --modules #0              Module resolution path
  --notify                  Allow OS notifications
  --publicPath #0           public path of emitted assets
  --splitChunks,--vendor    Separate vendor bundle
  --target,-t #0            Limit compilation to particular compilers

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start dev server and compile assets in dev mode
  $ @roots/bud dev