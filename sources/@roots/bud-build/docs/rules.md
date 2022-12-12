---
title: Default rules
---

| Type          | Description                                                                |
| :------------ | :------------------------------------------------------------------------- |
| `.js`         | `undefined`                                                                |
| `.css`        | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.module.css` | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.json`       | [json5](https://npmjs.com/package/json5)                                   |
| `.toml`       | [toml](https://npmjs.com/package/toml)                                     |
| `.yml`        | `yml-loader`                                                               |
| `.html`       | `html-loader`                                                              |
| `.md`         | `remark-loader`                                                            |
| `.svg`        | `asset/resource`                                                           |
| `.png`        | `asset/resource`                                                           |
| `.gif`        | `asset/resource`                                                           |
| `.jpg`        | `asset/resource`                                                           |
| `.jpeg`       | `asset/resource`                                                           |
| `.webp`       | `asset/resource`                                                           |
| `.woff`       | `asset`                                                                    |
| `.woff2`      | `asset`                                                                    |
| `.otf`        | `asset`                                                                    |
