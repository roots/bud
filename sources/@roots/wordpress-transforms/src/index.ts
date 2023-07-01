// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/wordpress-transforms
 */

export type Handle = string
export type Global = string
export type RequestMap = Map<string, [Global, Handle]>

export * as handle from '@roots/wordpress-transforms/handle'
export * as window from '@roots/wordpress-transforms/window'
export * as wordpress from '@roots/wordpress-transforms/wordpress'
