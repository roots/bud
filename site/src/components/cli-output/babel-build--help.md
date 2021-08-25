Compile production assets

USAGE
$ bud build:production

OPTIONS
-c, --cache cache compiler references to disk
-d, --debug produce config artifacts in [storage] dir
-h, --help show CLI help
-l, --log log to console
-m, --minimize minimize file size of compiled assets
-t, --target=target [default: ] limit compilation to this compiler
--ci non raw mode tty interoperable output
--hash hash compiled filenames
--manifest produce a manifest

ALIASES
$ bud build
$ bud build:production
$ bud production

EXAMPLE
$ bud build:production [name]
