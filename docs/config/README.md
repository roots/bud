# Configuration

There are several ways to configure your build. It is fine to mix and match approaches.

Applicable configs are applied one-by-one, with each subsequent config modifying the results of previous configs.

This is the order you can anticipate:

- static configs
- env specific static configs
- builder configs
- env specific builder configs

CLI arguments are applied last (to make it easier to experiment on top of an existing config from the command-line).

## As a function

Create a file in the root of your project exporting a function to configure the builder instance.

Using JS (`bud.config.js`):

```js
module.exports = (app) => {
  return app
    .use([require("@roots/bud-babel"), require("@roots/bud-postcss")])
    .entry({
      app: ["app.js", "app.css"],
    });
};
```

Using TS (`bud.config.ts`):

```ts
import { Framework } from "@roots/bud";
import babel from "@roots/bud-babel";
import postcss from "@roots/bud-postcss";

export default (app: Framework) => {
  return app.use([babel, postcss]).entry({
    app: ["app.js", "app.css"],
  });
};
```

You do **not** need to use TS in your project or even use the [**@roots/bud-typescript**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-typescript) extension in order to take advantage of a TS config file.

## Static configs

Using yml (`bud.config.yml`):

```yml
extensions:
  - "@roots/bud-babel"
  - "@roots/bud-postcss"
entry:
  app: "**/app.{js,css}"
assets:
  - assets/images
persist:
  type: memory
```

Using json (`bud.config.json`):

```json
{
  "extensions": ["@roots/bud-babel", "@roots/bud-postcss"],
  "entry": {
    "app": "**/app.{js,css}"
  },
  "assets": ["assets/images"],
  "persist": {
    "type": "memory"
  }
}
```

## Development specific configs

- `bud.config.development.ts`
- `bud.config.development.js`
- `bud.config.development.json`
- `bud.config.development.yml`

## Production specific configs

- `bud.config.production.ts`
- `bud.config.production.js`
- `bud.config.production.json`
- `bud.config.production.yml`
