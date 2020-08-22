---
description: Read environmental variables using the bud.env container
---

# Environmental variables

If you're using an `.env` file you can access its contents from within your config using the `bud.env` container.

## Example

```js
bud.env.get('HOST_NAME')
```
