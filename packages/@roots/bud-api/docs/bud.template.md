# bud.template

Enables and/or configures boilerplate HTML generated for your project. This HTML includes the path to your built assets automatically.

## Signature

```ts title='template.d.ts'
type Template = (
  this: Framework,
  options?: {
    enabled?: boolean
    template?: string
    replace?: {
      [key: string]: string
    },
  }
) => Framework
```

## Usage

This method requires no properties. By default it will source an html template for you.

```js title='bud.config.js'
bud.template()
```

You will likely want to define the following variables in a `.env` file if you're using it this way:

- APP_NAME
- APP_DESCRIPTION
- PUBLIC_URL

## Explicitly enabling or disabling

You may use `enabled` to explicitly disable or enable the html generation.

```js title='bud.config.js'
bud.template({enabled: false})
```

Useful in the event that an overeager extension is adding a template you do not have use for.

## Defining template variables

Add template variables using `replace`.

```js {3-7} title='bud.config.js'
bud.template({
  template: bud.path('project', 'public', 'index.html'),
  replace: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
    PUBLIC_URL: '/app/theme',
  },
})
```

You may use any of these variables in the template by surrounding the variable name with `%` characters.

```html {2} title='public/index.html'
<html>
  <title>%APP_NAME%</title>
</html>
```

You may use [**bud.define**](/docs/bud.define) should you need to access defined variables from your application code as well.

Lastly, any variables defined in an `.env` file are also made available to the template automatically.

## Default template reference

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
