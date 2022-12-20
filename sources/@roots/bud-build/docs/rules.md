---
title: Default rules
---

| Type            | Description                                                                |
| :-------------- | :------------------------------------------------------------------------- |
| `.js`           | `undefined`                                                                |
| `.css`          | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.module.css`   | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.json`         | [json5](https://npmjs.com/package/json5)                                   |
| `.toml`         | [toml](https://npmjs.com/package/toml)                                     |
| `.yml`          | `yml-loader`                                                               |
| `.html`         | `html-loader`                                                              |
| `.csv`          | `csv-loader`                                                               |
| `.xml`          | `xml-loader`                                                               |
| `.webp`         | `asset/resource`                                                           |
| `.svg`          | `asset/resource`                                                           |
| `.svg?inline`   | `asset/inline`                                                             |
| `.png`          | `asset/resource`                                                           |
| `.png?inline`   | `asset/inline`                                                             |
| `.gif`          | `asset/resource`                                                           |
| `.gif?inline`   | `asset/inline`                                                             |
| `.jpg`          | `asset/resource`                                                           |
| `.jpg?inline`   | `asset/inline`                                                             |
| `.jpeg`         | `asset/resource`                                                           |
| `.jpg?inline`   | `asset/inline`                                                             |
| `.woff`         | `asset`                                                                    |
| `.woff?inline`  | `asset/inline`                                                             |
| `.woff2`        | `asset`                                                                    |
| `.woff2?inline` | `asset/inline`                                                             |
| `.otf`          | `asset`                                                                    |
| `.otf?inline`   | `asset/inline`                                                             |
