---
id: bud-extensions.controller
title: controller class
sidebar_label: controller class
hide_title: true
sidebar: "api"
slug: controller
---

## Controller class

Extension instance controller

Signature:

```typescript
export declare class Controller
```

## Constructors

| Constructor                                                                   | Modifiers | Description            |
| ----------------------------------------------------------------------------- | --------- | ---------------------- |
| [(constructor)(\_app, extension)](/api/bud-extensions/controller/constructor) |           | Controller constructor |

## Properties

| Property                                                    | Modifiers | Type                                                        | Description                                           |
| ----------------------------------------------------------- | --------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| [app](/api/bud-extensions/controller/app)                   |           | Framework                                                   | The application instance                              |
| [booted](/api/bud-extensions/controller/booted)             |           | boolean                                                     | Has booted                                            |
| [log](/api/bud-extensions/controller/log)                   |           | typeof Service.prototype.log                                |                                                       |
| [meta](/api/bud-extensions/controller/meta)                 |           | { instance: string; registered: boolean; booted: boolean; } |                                                       |
| [moduleLogger](/api/bud-extensions/controller/modulelogger) |           | Signale                                                     |                                                       |
| [name](/api/bud-extensions/controller/name)                 |           | string                                                      | Extension module name                                 |
| [options](/api/bud-extensions/controller/options)           |           | any                                                         | Extension module options                              |
| [registered](/api/bud-extensions/controller/registered)     |           | boolean                                                     | Has registered                                        |
| [when](/api/bud-extensions/controller/when)                 |           | boolean                                                     | Value determining if the extension should be utilized |

## Methods

| Method                                                       | Modifiers | Description                                           |
| ------------------------------------------------------------ | --------- | ----------------------------------------------------- |
| [api()](/api/bud-extensions/controller/api)                  |           |                                                       |
| [boot()](/api/bud-extensions/controller/boot)                |           | Extension boot event                                  |
| [filter(key, object)](/api/bud-extensions/controller/filter) |           |                                                       |
| [get(key)](/api/bud-extensions/controller/get)               |           |                                                       |
| [make()](/api/bud-extensions/controller/make)                |           | Value determining if the extension should be utilized |
| [mixin()](/api/bud-extensions/controller/mixin)              |           |                                                       |
| [register()](/api/bud-extensions/controller/register)        |           | Extension registration event                          |
| [set(key, value)](/api/bud-extensions/controller/set)        |           |                                                       |
