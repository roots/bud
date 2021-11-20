/**
 * The {@link @roots/bud-dashboard#} package implements the {@link @roots/bud-framework#Dashboard} interface.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

import { Dashboard as Dashboard_2 } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import * as Ink from 'ink';
import { Instance } from 'ink';
import { Service } from '@roots/bud-framework';

export declare const Boot: () => Ink.Instance;

/**
 * Dashboard service
 *
 * @public
 */
export declare class Dashboard extends Service implements Dashboard_2 {
    /**
     * The Ink instance
     *
     * @public
     */
    instance: Instance;
    /**
     * Service register callback
     *
     * @public
     * @decorator `@bind`
     */
    registered(): Promise<void>;
    /**
     * Run the dashboard
     *
     * @public
     * @decorator `@bind`
     */
    run(): Framework;
    /**
     * Renders to the screen. It will rerender the existing
     * component if already initialized.
     *
     * @param Component - The body of the screen
     * @param title - The title of the screen
     *
     * @public
     * @decorator `@bind`
     */
    render(Component: any, title?: string): void;
}

/**
 * CLI Error handler
 *
 * @param body - Error body
 * @param title - Error title
 * @returns void
 *
 * @public
 */
declare const Error_2: CallableFunction;
export { Error_2 as Error }

export { }
