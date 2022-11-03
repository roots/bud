When using `@roots/bud-sass`, you will find that the `url()` function is not working as expected. This is because the `url()` function is relative to the target file, not the source file and Sass does not support url rewriting.

A few options are available to work around this.

### Strategies

#### prefix with `~`

The `~` prefix is a convention used to indicate that the path should be resolved by webpack. It works with [aliases](https://bud.js.org/docs/bud.alias).

Let's say you have an alias set up for `@fonts`:

```scss
url(~@fonts/muh-font.woff)
```

#### use an absolute path

bud.js will resolve absolute paths to whatever you have set as the `@src` directory.

```scss
url(/fonts/muh-font.woff)
```

#### use a relative path

This is the simplest option to understand and the most annoying to maintain. It is on you to ensure that the relative path is correct.

```scss
url(../fonts/muh-font.woff)
```
