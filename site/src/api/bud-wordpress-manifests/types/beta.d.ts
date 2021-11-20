/**
 * {@link @roots/merged-manifest-webpack-plugin# | @roots/merged-manifest-webpack-plugin} adapter
 *
 * @remarks
 * Wordpress manifests are a JSON representation of assets which will
 * need to be enqueued using WordPress PHP APIs for inclusion in a theme
 * or plugin.
 *
 * @see https://roots.io/bud

 * @packageDocumentation @betaDocumentation
 */

import { Container } from '@roots/container';
import { DefaultMethods } from 'signale';
import { Framework } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { MergedManifestWebpackPlugin } from '@roots/merged-manifest-webpack-plugin';
import { Signale } from 'signale';

export declare const make: Maybe<[Container<null>, Framework, Signale<DefaultMethods>], MergedManifestWebpackPlugin>;

declare const name_2: string;
export { name_2 as name }

export { }
