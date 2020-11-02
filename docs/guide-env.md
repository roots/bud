---
description: Read environmental variables using the bud.env container
---

# Env

Bud includes support for values set in a `.env` file. This file should be located in the project root.

## Accessing env values from the config file

Values defined in the application `.env` file are available via `bud.env`.

This is a container object bound to `bud.env`.

```js
bud.env.get('APP_NAME')
```

For more information on using containers: [container documentation](components-container.md).

## Accessing env values from within a template

Values defined in the application `.env` file are available within HTML templates ([see `bud.template` for more information on HTML templating](config-template.md)).

## Accessing env values from within the application

Values defined in the application `.env` file are available in app code.

```js
const {APP_NAME} = window
```

If you have a secret value in `.env` which should not be shared in the application bundle, you can flag it as private by including the string `SECRET` in the variable name:

```env
APP_NAME='My application'
SECRET_AUTH_PASS='looselips'
```

Trying to access `window.SECRET_AUTH_PASS` within the application will show that it is `undefined`.

This idea was inspired by NextJS's handling of sensitive environmental variables.
