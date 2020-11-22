---
description: Read environmental variables using the bud.env container
---

# Env

Bud includes support for values set in a `.env` file.

This file should be located in the project root.

## Accessing env values from the config file

Values defined in the application `.env` file are available via `bud.env`.

The `bud.env` object is a [bud.container instance](components-container.md).

This gives you a fair bit of flexibility.
But, most commonly you'll probably find yourself using these methods:

```js
bud.env.get('APP_NAME')
```

```js
bud.env.is('APP_ENV', 'production')
```

For more information on using containers: [container documentation](components-container.md).

## Accessing env values from within a template

Values defined in the application `.env` file are available within HTML templates ([see `bud.template` for more information on HTML templating](config-template.md)).

## Accessing env values from within the application

Values defined in the application `.env` file are
available in modules via the `window` global.

```js
const {APP_NAME} = window
```

## Handling secrets

If you have a sensitive value (like an API key) in `.env`
which you don't want shared in the application bundle, you can either:

1. remove `APP_` from the key. or;
2. flag it as private by including the string `SECRET` in the variable name:

```env
APP_NAME='My application'
APP_SECRET_AUTH_PASS='looselips'
```

Trying to access `window.APP_SECRET_AUTH_PASS` within the application will show that it is `undefined`.
