━━━ bud - 0.0.0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  $ bud <command>

━━━ General commands ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud doctor [--notify]
    Check project for common errors

  bud repl [--color,-c] [--indent,-i #0] [--depth,-d #0]
    Use bud in a repl

  bud view [--color,-c] [--indent,-i] [subject]
    Explore bud object

━━━ build ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud build [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--input,-i,--src #0] [--output,-o,--dist #0] [--manifest] [--minimize] [--publicPath #0] [--splitChunks,--vendor] [--storage #0]
    Compile source assets

  bud build development [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--input,-i,--src #0] [--output,-o,--dist #0] [--manifest] [--minimize] [--publicPath #0] [--splitChunks,--vendor] [--storage #0] [--browser] [--indicator] [--overlay] [--reload]
    Compiles source assets in `development` mode.

  bud build production [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--input,-i,--src #0] [--output,-o,--dist #0] [--manifest] [--minimize] [--publicPath #0] [--splitChunks,--vendor] [--storage #0]
    Compiles source assets in `production` mode.

━━━ tasks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud clean [@storage] [@dist]
    Clean project artifacts and caches

━━━ tools ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud webpack ...
    Webpack CLI passthrough

You can also print more details about any of these commands by calling them with 
the `-h,--help` flag right after the command name.