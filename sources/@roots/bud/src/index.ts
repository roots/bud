// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * bud.js
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

/// <reference resolution-mode="import" types="@roots/bud-api" />
/// <reference resolution-mode="import" types="@roots/bud-build" />
/// <reference resolution-mode="import" types="@roots/bud-compiler" />
/// <reference resolution-mode="import" types="@roots/bud-cache" />
/// <reference resolution-mode="import" types="@roots/bud-dashboard" />
/// <reference resolution-mode="import" types="@roots/bud-extensions" />
/// <reference resolution-mode="import" types="@roots/bud-framework" />
/// <reference resolution-mode="import" types="@roots/bud-hooks" />
/// <reference resolution-mode="import" types="@roots/bud-minify" />
/// <reference resolution-mode="import" types="@roots/bud-server" />

import {Bud} from '@roots/bud/bud'

interface Config {
  (bud: Bud): Promise<any>
}

export type {Extension} from '@roots/bud-framework'

export {Bud, type Config}
export {factory} from '@roots/bud/factory'

export {get, instance as bud, set} from '@roots/bud/instance'
