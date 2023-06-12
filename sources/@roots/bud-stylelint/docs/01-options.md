---
title: Options
---

The `bud.stylelint` API provides a number of options that can be used to configure Stylelint. These options include:

- `cache`: Enables caching of lint results to improve performance on subsequent runs. By default, it's set to true unless in a continuous integration (CI) environment.
- `cacheLocation`: Specifies the location of the cache. By default, it's set to a directory named `stylelint` in the cache directory.
- `config`: Specifies the Stylelint configuration object. By default, it finds the first file with `stylelint` in its name and uses that as the config.
- `context`: The context path. By default, it's set to the `@src` directory.
- `failOnError`: Indicates whether to fail the build when errors are detected. By default, this is true in production environments.
- `failOnWarning`: Indicates whether to fail the build when warnings are detected. By default, this is set to false.
- `files`: Specifies the files to be linted. By default, this is undefined, meaning that all files will be linted.
- `fix`: Indicates whether Stylelint should try to fix any issues it finds. By default, this is set to false.
- `stylelintPath`: The path to the Stylelint binary. By default, this is undefined, meaning that the binary in the node_modules directory will be used.
