---
description: Define vars available to application code.
---

# bud.define

Make modules and variables global for the application.

## Usage

Define values:

```ts
bud.define({
  APP_NAME: 'My Application',
})
```

Use them in application code:

```ts
const {APP_NAME} = window
```

Use them in templates:

```html
<html>
  <title>%APP_NAME%</title>
  <!-- ... -->
</html>
```

## Defining with an .env file

Values defined in the application `.env` file are also defined for the application.

If you have a secret value in `.env` which should not be shared in the application bundle, you can flag it by including the string `SECRET` in the envvar name:

```env
APP_NAME='My application'
SECRET_AUTH_PASS='looselips'
```

Trying to access `window.SECRET_AUTH_PASS` within the application will show that it is `undefined`.

## Signature

```ts
function (variables: {
  [key: string]: any
}): Framework.Bud
```

## Parameters

| Name      | Type                   |
| --------- | ---------------------- |
| variables | `{[key: string]: any}` |

## Returns

`Framework.Bud`: The Bud instance
