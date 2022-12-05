---
title: Usage
---

Import the `Dependencies` manager and instantiate.

The base path is required.

```typescript
import {Dependencies} from '@roots/dependencies'

const manager = new Dependencies(process.cwd())
```

Optionally, you may also provide handlers for messages and errors:

```typescript
import {Dependencies} from '@roots/dependencies'
const manager = new Dependencies(process.cwd(), console.log, console.error)
```

Create and use a new client:

```typescript
const client = await manager.getClient()

await this.client.install(`lodash`)
await this.client.uninstall(`lodash`)
```

Get the latest version of a package:

```typescript
const version = await this.client.getLatestVersion(`lodash`)
```

install a specific version with an array or a formatted string (`{signifier}@{version}`):

```typescript
await this.client.install([`lodash`, `latest`])
await this.client.install(`lodash@latest`)
```

Supports flags:

```typescript
await this.client.install([`lodash`, `latest`], `--dev`)
```
