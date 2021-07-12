# bud.env

**bud** includes support for utilizing dotenv values (in your config, templates and the client).

Environment variable values are sourced from an `.env` file located in the project root.

## Accessing env values from the config file

Values defined in the application `.env` file are available via `bud.env`.

The `bud.env` object is a container instance.

Most commonly you'll probably find yourself using these methods:

```js
bud.env.get("APP_NAME");
```

```js
bud.env.is("APP_ENV", "production");
```

## Accessing env values from within a template

Values defined in the application `.env` file are available within HTML templates ([see `bud.template` for more information on HTML templating](/docs/bud.template)).

## Accessing env values from within the application

Values defined in the application `.env` file are made available to bundled modules via the `window` global provided that they include `PUBLIC_` in the key.

This is to prevent accidental sharing of sensitive data.

```js
const { PUBLIC_APP_NAME } = window;
```
