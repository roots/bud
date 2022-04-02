Compile source assets

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ @roots/bud build

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --mode #0                 Compilation mode
  --cache                   Utilize compiler's filesystem cache
  --ci                      Run in CI mode (disables keyboard input handlers).
  --clean                   Clean artifacts and distributables prior to compilation
  --debug                   Enable debugging mode. Very verbose logging. Writes output files to `@storage` directory
  --devtool                 Set devtool option
  --flush                   Force clearing bud internal cache
  --hash                    Hash compiled filenames
  --html                    Generate an html template
  --input,-i #0             Source directory (relative to project)
  --output,-o #0            Distribution directory (relative to project)
  --storage #0              Storage directory (relative to project)
  --indicator               Enable development status indicator
  --log                     Enable logging
  --manifest                Generate a manifest of compiled assets
  --minimize                Minimize compiled assets
  --modules #0              Module resolution path
  --notify                  Enable notfication center messages
  --overlay                 Enable error overlay in development mode
  --publicPath #0           public path of emitted assets
  --splitChunks,--vendor    Separate vendor bundle
  --target,-t #0            Limit compilation to particular compilers
  --verbose                 Set logging level

━━━ Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`bud build` compiles source assets from the `@src` directory to the `@dist` 
directory.

Any boolean options can be negated by prefixing the flag with `--no-`. You can 
also pass a boolean value. Example: `--no-cache` and `--cache false` are 
equivalent.

By default, the `@src` directory is `[project]/src`. You can override this with 
the `-i` flag.

If you run this command without a bud configuration file `bud` will look for an 
entrypoint at `@src/index.js`.

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Compile source
  $ @roots/bud build