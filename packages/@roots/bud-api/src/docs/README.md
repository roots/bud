## Overview

[@roots/bud-api]([[base]]/packages/@roots/bud-api) contains config utilities intended for use in project-level configuration.

## Details

Each function has its lexical scope bound to the `Framework.Bud` object.

Whenever possible API methods should return the Bud object so that the interface
remains "fluent". You can guarantee this in development using the `Fluent` utility
type.
