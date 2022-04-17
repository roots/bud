// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds support for react to bud projects.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 *
 * @packageDocumentation
 */

import './interface'

import {ReactExtension} from './extension'

export const {register, boot, label} = ReactExtension
