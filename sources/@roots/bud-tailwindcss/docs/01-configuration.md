By default the bud.js tailwind implementation requires no configuration.

If you wish to customize the tailwind configuration you can create a tailwind config file.

bud.js allows for you to write your tailwind config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

### Configuring tailwind with `bud.tailwind`

You can configure tailwind directly in your bud configuration file using `bud.tailwind.setConfig`.

```ts title=bud.config.js
bud.tailwind.setConfig({
  content: [bud.path(`@src/**/*.{ts,php}`)],
  theme: {},
  plugins: [],
})
```

`bud.tailwind.setConfig` is just one method available to help you configure tailwindcss.

### Set content

You can set the tailwindcss `content` option with `bud.tailwind.setContent`.

```ts title=bud.config.js
bud.tailwind.setContent([bud.path(`@src/**/*.{ts,php}`)])
```

### Set theme

You can set the tailwindcss `theme` option with `bud.tailwind.setTheme`.

```ts title=bud.config.js
bud.tailwind.setTheme({
  colors: {primary: `#000000`},
})
```

### Extend theme

You can extend the tailwindcss `theme` option with `bud.tailwind.extendTheme`.

```ts title=bud.config.js
bud.tailwind.extendTheme({
  colors: {primary: `#000000`},
})
```

This is usually preferred over `bud.tailwind.setTheme` as it will merge your theme with the default tailwindcss theme.

### Set plugins

You can set the tailwindcss `plugins` option with `bud.tailwind.setPlugins`.

```ts title=bud.config.js
import forms from '@tailwindcss/forms'

export default async bud => {
  bud.tailwind.setPlugins([forms])
}
```

## Using tailwind values in build config files

You can use resolved tailwind values in your bud config files by referencing `bud.tailwind.theme`:

```ts title=bud.config.js
export default async bud => {
  console.log(`colors`, bud.tailwind.theme.colors)
}
```

You can also use `bud.tailwind.getTheme`, which allows you to pass a key to get a specific value:

```ts title=bud.config.js
export default async bud => {
  console.log(`colors`, bud.tailwind.getTheme(`colors`))
}
```

## Using tailwind values in JS source

bud.js can be configured to allow for you to import tailwind theme values using the (virtual) `@tailwind/*` alias.

An example:

```typescript
import {black} from '@tailwind/colors'
import {sans} from '@tailwind/fontFamily'

export const main = () => {
  document.body.style.backgroundColor = black
  document.body.style.fontFamily = sans
}
```

Generating the imports can be memory intensive and increase build times, so it is opt-in.

```ts
bud.tailwind.generateImports()
```

Better to generate imports only for specific keys:

```ts
bud.tailwind.generateImports([`colors`, `fontFamily`])
```

This is a much better than trying to import the actual tailwind config file to read these values for two reasons:

1. the values are fully resolved (merged with preset tailwindcss theme values, plugins applied, etc.)
2. there is less impact on the overall bundle size

If you don't import from `@tailwind/*` nothing is added to the bundle (even if the imports are generated)
