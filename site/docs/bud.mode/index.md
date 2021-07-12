---
sidebar_position: 1
---

# bud.mode

Property which is either `production` or `development`.

When running bud uing the cli:

- **bud build** will always run in `production`.
- **bud dev** will always run in `development`.

## Additional information

**bud.mode** correlates with `NODE_ENV` and `BABEL_ENV`.
