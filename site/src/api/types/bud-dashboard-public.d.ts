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

/// <reference types="react" />

import { Dashboard as Dashboard_3 } from '@roots/bud-framework';
import type { Framework } from '@roots/bud-framework';
import { Ink } from '@roots/bud-support';
import { React as React_2 } from '@roots/bud-support';
import { Service } from '@roots/bud-framework';

/**
 * Bar component
 *
 * @public
 */
declare const Bar: React_2.FunctionComponent<{
    colors?: string[];
    percent: number;
    character?: string;
    maxWidth?: number;
}>;

declare namespace Components {
    export {
        Bar,
        Dashboard_2 as Dashboard,
        Error_3 as Error,
        Input,
        Main,
        Performance_2 as Performance,
        Progress,
        Screen_2 as Screen
    }
}
export { Components }

/**
 * Dashboard service container implementation
 *
 * @public @core @container
 */
export declare class Dashboard extends Service implements Dashboard_3 {
    /**
     * {@inheritDoc @roots/bud-framework#Service.name}
     * @public
     */
    name: string;
    /**
     * The {@link Ink} instance
     * @public
     */
    instance: Ink.Instance;
    /**
     * {@inheritDoc @roots/bud-framework#Service.register}
     *
     * @public
     * @decorator `@bind`
     */
    register(): void;
    /**
     * {@inheritDoc @roots/bud-framework#Service.booted}
     *
     * @public
     * @decorator `@bind`
     */
    booted(): void;
    /**
     * Run the dashboard
     *
     * @remarks
     * This method will initialize the dashboard CLI interface
     * unless the app.store `cli` entry is `false`.
     *
     * By default the `cli` entry is false. However, the
     * cli class from `@roots/bud` sets it to `true`.
     *
     * @public
     * @decorator `@bind`
     */
    run(): void;
    /**
     * Renders an error message and title to the screen.
     *
     * @see {@link Framework.error}
     *
     * @public
     * @decorator `@bind`
     */
    renderError(body: string, title?: string): void;
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
 * Dashboard display component
 *
 * @public
 */
declare const Dashboard_2: ({ bud }: {
    bud: Framework;
}) => JSX.Element;

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

/**
 * Error component
 *
 * @public
 */
declare const Error_3: ({ title, body }: {
    title?: string;
    body: any;
}) => JSX.Element;

declare namespace hooks {
    export {
        useForceUpdate,
        useFormatter
    }
}
export { hooks }

/**
 * KBD input handler
 *
 * @public
 */
declare const Input: ({ bud }: {
    bud: any;
}) => any;

/**
 * Container
 *
 * @public
 */
declare const Main: ({ children }: {
    children: any;
}) => JSX.Element;

/**
 * Performance metrics component
 *
 * @public
 */
declare const Performance_2: () => JSX.Element;

/**
 * Progress component
 *
 * @public
 */
declare const Progress: ({ progress, theme }: {
    progress: any;
    theme: any;
}) => JSX.Element;

/**
 * Screen (generic container)
 *
 * @public
 */
declare const Screen_2: ({ app, color, title, children, }: {
    app: Framework;
    color?: any;
    title?: string;
    children: any;
}) => JSX.Element;

/**
 * Forces React re-renders
 *
 * @public
 */
declare const useForceUpdate: () => () => void;

/**
 * Formats filesize and duration
 *
 * @public
 */
declare const useFormatter: () => {
    fileSize: (size: number) => unknown;
    duration: (duration: number) => unknown;
};

export { }
