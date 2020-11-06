---
description: Generate HTML boilerplate.
---

# bud.template

This function allows you to generate and/or configure boilerplate HTML generated for your project. This HTML includes the path to your built assets automatically. It is especially useful when building hashed assets with [`bud.hash`](config-hash.md).

In the example below, we:

- Specify our own template to use over the default using `template`.
- Add additional variables using `replacements`.

In addition to the variables specified in `replacements` any top level key from `package.json` and any `.env` variables are also made available to the template -- you don't need to specify anything.

You can use any of these variables in the template by surrounding the variable name with `%` characters. Example: `%VARIABLE_NAME%`.

## Usage

```js
const {name, description} = bud.fs.readJson('package.json')
bud.template({
  template: bud.project('public/index.html'),
  replacements: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
    PUBLIC_URL: bud.env.get('PUBLIC_URL'),
  },
})
```

## Reference: example .env file

```env
APP_NAME=Test
APP_DESCRIPTION="My application"
PUBLIC_URL=http://localhost:3000
```

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

## Arguments

| Name           | Type                   |
| -------------- | ---------------------- |
| `template`     | string                 |
| `replacements` | {[key: string]: value} |
