/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for {@link @roots/entrypoints-webpack-plugin# | @roots/entrypoints-webpack-plugin}.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import { Container } from '@roots/container';
import { DefaultMethods } from 'signale';
import { EntrypointsWebpackPlugin } from '@roots/entrypoints-webpack-plugin';
import { Framework } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { Options } from '@roots/entrypoints-webpack-plugin';
import { Signale } from 'signale';

export declare const make: Maybe<[Container<Options>, Framework, Signale<DefaultMethods>], EntrypointsWebpackPlugin>;

declare const name_2: string;
export { name_2 as name }

export { }
