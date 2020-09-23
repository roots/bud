---
description: Generate HTML boilerplate.
---

# bud.template

This functionality allows you to configure the boilerplate HTML generated for your project.

In the example below, we:

- Specify our own template to use over the default using `template`.
- Add additional variables using `replacements`.

In addition to the variables specified in `replacements` any top level key from `package.json` and any `.env` variables are also made available to the template -- you don't need to specify anything.

You can use any of these variables in the template by surrounding the variable name with `%` characters, like so: `%VARIABLE_NAME%`.

## Usage

```js
bud.template({
  template: bud.fs.path.resolve('public/index.html'),
  replacements: {
    APP_NAME: bud.package.get('name'),
    APP_DESCRIPTION: bud.package.get('description'),
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
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="%APP_DESCRIPTION%"
    />

    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.
      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>%APP_NAME%</title>
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

| Name   | Type   |
| ------ | ------ |
| `template` | string |
| `replacements` | {[key: string]: value}
