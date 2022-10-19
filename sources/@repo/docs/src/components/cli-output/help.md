━━━ bud - 0.0.0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  $ bud <command>

━━━ General commands ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud doctor [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--notify]
    Check project for common errors

  bud repl [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--color,-c] [--indent,-i #0] [--depth,-d #0]
    Use bud in a repl

  bud view [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--color,-c] [--indent,-i] [subject]
    Explore bud object

━━━ build ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud build [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--discovery] [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--manifest] [--minimize] [--publicPath #0] [--runtime #0] [--splitChunks,--vendor] [--storage #0]
    Compile source assets

  bud build development [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--discovery] [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--manifest] [--minimize] [--publicPath #0] [--runtime #0] [--splitChunks,--vendor] [--storage #0] [--browser] [--indicator] [--overlay] [--reload]
    Compiles source assets in `development` mode.

  bud build production [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [--discovery] [--notify] [--cache] [--ci] [--clean] [--debug] [--devtool #0] [--editor] [--esm] [--flush] [--hash] [--html] [--immutable] [--manifest] [--minimize] [--publicPath #0] [--runtime #0] [--splitChunks,--vendor] [--storage #0]
    Compiles source assets in `production` mode.

━━━ tasks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud clean [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] [@storage] [@dist]
    Clean project artifacts and caches

━━━ tools ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  bud webpack [--input,-i,--@src,--src #0] [--output,-o,--@dist,--dist #0] ...
    Webpack CLI passthrough

You can also print more details about any of these commands by calling them with 
the `-h,--help` flag right after the command name.