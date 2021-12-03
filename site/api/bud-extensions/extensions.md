---
id: bud-extensions.extensions
title: extensions class
sidebar_label: extensions class
hide_title: true
sidebar: "api"
slug: extensions
---

## Extensions class

Extensions Service

Signature:

```typescript
export declare class Extensions extends Framework.Service implements Framework.Extensions
```

Extends: Framework.Service

Implements: Framework.Extensions

## Remarks

Manages extension controllers

## Properties

| Property                                                | Modifiers | Type    | Description |
| ------------------------------------------------------- | --------- | ------- | ----------- |
| [queue](/api/bud-extensions/extensions/queue)           |           | any\[\] |             |
| [repository](/api/bud-extensions/extensions/repository) |           | {}      |             |

## Methods

| Method                                                                     | Modifiers | Description                                                                                                                           |
| -------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [add(extension)](/api/bud-extensions/extensions/add)                       |           | Add a [Controller](//bud-extensions/controller) to the container                                                                      |
| [boot()](/api/bud-extensions/extensions/boot)                              |           |                                                                                                                                       |
| [booted()](/api/bud-extensions/extensions/booted)                          |           |                                                                                                                                       |
| [bootExtension(key)](/api/bud-extensions/extensions/bootextension)         |           |                                                                                                                                       |
| [bootExtensions()](/api/bud-extensions/extensions/bootextensions)          |           |                                                                                                                                       |
| [enqueue(extension)](/api/bud-extensions/extensions/enqueue)               |           | Queue an extension to be added to the container before the build process.                                                             |
| [make()](/api/bud-extensions/extensions/make)                              |           | Returns an array of plugin instances which have been registered to the Extensions container and are set to be used in the compilation |
| [makeController(extension)](/api/bud-extensions/extensions/makecontroller) |           | Controller factory                                                                                                                    |
| [processQueue()](/api/bud-extensions/extensions/processqueue)              |           |                                                                                                                                       |
| [registered()](/api/bud-extensions/extensions/registered)                  |           |                                                                                                                                       |
| [registerExtension(key)](/api/bud-extensions/extensions/registerextension) |           |                                                                                                                                       |
| [registerExtensions()](/api/bud-extensions/extensions/registerextensions)  |           |                                                                                                                                       |
