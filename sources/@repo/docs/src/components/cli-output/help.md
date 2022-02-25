━━━ bud - 0.0.0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  $ bud <command>

━━━ Clean ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud clean
    Clean project artifacts and caches

━━━ Compile ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud build [--mode #0] [--cache] [--cacheType,--cache.type #0] [--clean] [--hash] [--html] [--project #0] [--input,-i #0] [--output,-o #0] [--storage #0] [--log] [--logLevel,--log.level #0] [--manifest] [--minimize] [--publicPath #0] [--splitChunks,--vendor] [--target,-t #0]
    Compile source assets

  bud dev [--cache] [--cacheType,--cache.type #0] [--clean] [--hash] [--html] [--project #0] [--input,-i #0] [--output,-o #0] [--storage #0] [--log] [--logLevel,--log.level #0] [--manifest] [--minimize] [--publicPath #0] [--splitChunks,--vendor] [--target,-t #0]
    Compile and serve source assets

━━━ Doctor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud doctor
    Check compiled configuration against webpack

You can also print more details about any of these commands by calling them with 
the `-h,--help` flag right after the command name.