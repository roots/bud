/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import { ApplyPlugin } from '@roots/bud-framework/types/Extensions';
import { Container } from '@roots/container';
import { Framework } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';

export declare const make: Maybe<[Container<unknown>, Framework], ApplyPlugin>;

declare const name_2: string;
export { name_2 as name }

export { }
