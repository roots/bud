Compile source assets

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud build

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --mode #0                      Compilation mode
  --cache                        Utilize filesystem cache
  --cacheType,--cache.type #0    Type of cache
  --clean                        Clean artifacts and distributables prior to compilation
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

━━━ Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`bud build` compiles source assets from the `src` directory to the `dist` 
directory.

Any boolean options can be negated by prefixing the flag with `--no-`. You can 
also pass a boolean value. Example: `--no-cache` and `--cache false` are 
equivalent.

By default, the `src` directory is `[cwd]/src`. You can override this with the 
`-i` flag.

If you run this command without a bud configuration file `bud` will look for an 
entrypoint at `src/index.js`.

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Compile source
  $ bud build