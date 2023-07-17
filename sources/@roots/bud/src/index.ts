// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * bud.js
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

/// <reference types="@roots/bud-api" />
/// <reference types="@roots/bud-build" />
/// <reference types="@roots/bud-compiler" />
/// <reference types="@roots/bud-cache" />
/// <reference types="@roots/bud-dashboard" />
/// <reference types="@roots/bud-extensions" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-hooks" />
/// <reference types="@roots/bud-minify" />
/// <reference types="@roots/bud-server" />

import {Bud} from '@roots/bud/bud'

interface Config {
  (bud: Bud): Promise<any>
}

export {Bud, type Config}

export {factory} from '@roots/bud/factory'
export {get, instance as bud, set} from '@roots/bud/instance'
