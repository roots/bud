---
title: bud.assets
description: Include static assets in your compilation even if they aren't referenced in scripts or stylesheets.
---

Include static assets in your compilation even if they aren't referenced in scripts or stylesheets.

This is an older function and there are problems with it related to providing a single interface for handling files and directories. For the most part its fine but new projects should consider using [bud.copyFile](https://bud.js.org/docs/bud.copyFile) and/or [bud.copyDir](https://bud.js.org/docs/bud.copyDir) instead.
