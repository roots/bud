---
title: bud.compilePaths
---

**bud.compilePaths** is used to specify directories which should be treated as source directories.

If you have errors which say something along the lines of `You may need an appropriate loader to handle this file type, currently no
loaders are configured to process this file.`, this is probably the function you want to use to fix that!

By default, **bud.js** treats code outside of [the `@src` directory](https://bud.js.org/docs/bud.path) (likely modules downloaded via npm or yarn) as code that has already been bundled by some other means. This is a huge performance boost for your project! If that code was already compiled by the package author it would be a waste of time and energy to compile it again.

However, some authors may publish uncompiled source code with the expectation that you will transpile it as part of your build process. This function simplifies the process of configuring **bud.js** to handle these cases.
