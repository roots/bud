Clean project artifacts and caches

━━━ Usage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

$ bud clean

━━━ Options ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  --input,-i,--@src,--src #0       Source directory (relative to project)
  --output,-o,--@dist,--dist #0    Distribution directory (relative to project)
  @storage                         empty @storage
  @dist                            empty @dist

━━━ Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`bud clean` empties the `@dist` and `@storage` directories.

`bud clean @dist` empties the `@dist` directory.

`bud clean @storage` empties the `@storage` directory.

━━━ Examples ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Clean artifacts/caches
  $ bud clean

Clean dist
  $ bud clean @dist

Clean storage
  $ bud clean @storage