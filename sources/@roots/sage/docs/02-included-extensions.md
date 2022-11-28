---
title: Included extensions
---

The @roots/sage extension depends on [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress) which in turn depends on [@roots/bud-preset-recommend](https://bud.js.org/extensions/bud-preset-recommend).

All told, these are the extensions which are installed as peers of @roots/sage:

| Extension                                                               | Description                                                    |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| [@roots/bud-babel](https://bud.js.org/extensions/bud-babel)             | Babel transpiler                                               |
| [@roots/bud-entrypoints](https://bud.js.org/extensions/bud-entrypoints) | Emits `entrypoints.json` manifest                              |
| [@roots/bud-postcss](https://bud.js.org/extensions/bud-postcss)         | PostCSS transpiler                                             |
| [@roots/bud-react](https://bud.js.org/extensions/bud-react)             | React support                                                  |
| @roots/bud-wordpress-dependencies                                       | emits `wordpress.json` manifest                                |
| @roots/bud-wordpress-externals                                          | Externalizes references to code provided by `window.wp`        |
| @roots/bud-wordpress-manifests                                          | Combines the `entrypoints.json` and `wordpress.json` manifests |
