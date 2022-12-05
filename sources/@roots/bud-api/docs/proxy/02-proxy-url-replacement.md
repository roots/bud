---
title: URL replacement
---

Instances of the proxy URL's base URL with the dev server's base URL in responses.
Otherwise, absolute URLs would still point to the proxied server.

This won't work for all setups. But, **bud.proxy** takes a second, optional parameter to customize this default behavior.

Each search/replace is expressed with a `tuple`. The first item is the
search string, and the second is the replacement:

```ts
const replacement = ['search string', 'replace string']
```

These are stored by **bud.js** as an array:

```ts
const replacements = [
  ['find', 'replace'],
  ['find2', 'replace2'],
]
```

You can add additional replacements using a callback:

```ts title='bud.config.ts'
bud.proxy('https://example.test', (replacements = []) => {
  replacements.push(['https://find.test', 'https://replace.test'])
  return replacements
})
```

To fully ovewrite these search/replace tasks, you can pass the array
without a callback:

```ts title='bud.config.ts'
bud.proxy('https://example.test', [
  ['https://find.test', 'https://replace.test'],
])
```
