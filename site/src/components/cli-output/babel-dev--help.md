Compile dev assets

USAGE
$ bud build:dev

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
$ bud dev
$ bud start
$ bud build:development

EXAMPLE
$ bud build:dev [name]
