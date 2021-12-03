---
id: bud-api.facade.js
title: js property
sidebar_label: js property
hide_title: true
sidebar: "api"
slug: js
---

## Facade.js property

Generate application entrypoints from source asset paths.

Signature:

```typescript
js: entryFacade;
```

## Remarks

\*\*Globbing\*\*

Uses \[fast-glob\](https://git.io/JkGbw) syntax.

\*\*Supported patterns\*\*

- `*` matches any number of characters, but not `/` - `?` matches a single character, but not `/` - `**` matches any number of characters, including `/`, as long as it's the only thing in a path part - `{}` allows for a comma-separated list of "or" expressions - `!` at the beginning of a pattern will negate the match

## Example 1

Create an entrypoint from a single file:

```js
app.entry("app", "app.js");
```

## Example 2

Create an entrypoint from multiple files:

```js
app.entry("app", ["js/app.js", "css/app.css"]);
```

## Example 3

Create an entrypoint comprised of all js assets:

```js
app.entry("app", "*.js");
```

## Example 4

You may create more than one entrypoint using object syntax:

```js
app.entry({
  scripts: "*.js",
  styles: ["*.css", "*.scss"],
});
```

## Example 5

Declare entrypoint dependencies:

```js
app.entry({
  react: {
    import: ["react", "react-dom"],
  },
  app: {
    import: ["app.js"],
    dependOn: ["react"],
  },
});
```
