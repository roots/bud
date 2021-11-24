/**
 * Easy programmatic package management for yarn and npm.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

/**
 * Base command
 *
 * @public
 */
declare abstract class Command {
    path: string;
    /**
     * @public
     */
    onMessage(message: string): void;
    /**
     * @public
     */
    constructor(path?: string, onMessage?: (message: string) => void);
    /**
     * @public
     */
    static execute(onMessage: (message: string) => void, ...commandArgs: Array<string>): Promise<any>;
    /**
     * @public
     */
    static normalizeDependencies(dependencies: Array<string | [string, string]>): Array<string>;
}

export declare class Dependencies {
    path: string;
    /**
     * @public
     */
    constructor(path?: string);
    /**
     * @public
     */
    get client(): IDependencyManager;
    /**
     * @public
     */
    isYarn(): boolean;
}

export declare interface IDependencyManager {
    onMessage?: (message: string) => void;
    path: string;
    install: Install;
    uninstall: Uninstall;
}

declare interface Install {
    (dependencies: Array<string | [string, string]>, dev?: boolean, onMessage?: (message: string) => void): Promise<any>;
}

/**
 * Npm command
 *
 * @public
 */
export declare class Npm extends Command implements IDependencyManager {
    /**
     * @public
     */
    install(dependencies: Array<string | [string, string]>, dev?: boolean, onMessage?: (message: string) => void): Promise<any>;
    /**
     * @public
     */
    uninstall(dependencies: Array<string | [string, string]>, onMessage?: (message: string) => void): Promise<any>;
}

declare interface Uninstall {
    (dependencies: Array<string | [string, string]>, onMessage?: (message: string) => void): Promise<any>;
}

/**
 * Yarn command
 *
 * @public
 */
export declare class Yarn extends Command implements IDependencyManager {
    /**
     * @public
     */
    install(dependencies: Array<string | [string, string]>, dev?: boolean, onMessage?: (message: string) => void): Promise<any>;
    /**
     * @public
     */
    uninstall(dependencies: Array<string | [string, string]>, onMessage?: (message: string) => void): Promise<any>;
}

export { }
