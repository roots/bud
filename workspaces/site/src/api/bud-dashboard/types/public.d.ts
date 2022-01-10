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
 *  @packageDocumentation
 */

import { Dashboard as Dashboard_2 } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Instance } from 'ink';
import { Service } from '@roots/bud-framework';

/**
 * Dashboard service
 *
 * @public
 */
export declare class Dashboard extends Service implements Dashboard_2 {
    /**
     * ink instance
     *
     * @public
     */
    instance: Instance;
    /**
     * Stderr buffer
     *
     * @public
     */
    stderr: string[];
    /**
     * Stdout buffer
     *
     * @public
     */
    stdout: string[];
    /**
     * Service register callback
     *
     * @public
     * @decorator `@bind`
     */
    bootstrap(): Promise<void>;
    /**
     * Run the dashboard
     *
     * @public
     * @decorator `@bind`
     * @decorator `@once`
     */
    run(): Framework;
    /**
     * @public
     * @decorator `@bind`
     * @decorator `@once`
     */
    close(): void;
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
    render(Component: any): void;
    rerender(): Promise<void>;
}

export { }
