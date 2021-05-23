# bud.template

This enables and/or configures boilerplate HTML generated for your project. This HTML includes the path to your built assets automatically.

## Usage

Passed with no arguments the default HTML template will be used and all variables will be sourced from `.env`.

```js
bud.template()
```

## Customizing

- Specify our html template using `template`.
- Add additional variables using `replacements`.

You can use any of these variables in the template by surrounding the variable name with `%` characters. Example: `%VARIABLE_NAME%`.

```js
const {name, description} = bud.disk.fs.readJson('package.json')
bud.template({
  template: bud.project('public/index.html'),
  replacements: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
    PUBLIC_URL: '/app/theme',
  },
})
```

## Sourcing from .env

In addition to the variables specified in `replacements` any `.env` variables are also made available to the html -- you don't need to specify anything.

## Reference: the default HTML boilerplate

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <title>%APP_NAME%</title>
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="%APP_DESCRIPTION%" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  </head>

  <body>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      You can add webfonts, meta tags, or analytics to this file.
    -->
  </body>
</html>
```
