/**
 * Hooks system used for framework eventing.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

import { Framework } from '@roots/bud-framework';
import { Hooks as Hooks_2 } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';

export declare class Hooks extends Service implements Hooks_2 {
    /**
     * @public
     */
    name: string;
    boot(): Promise<void>;
    get<T = any>(path: `${Hooks_2.Name & string}`): T;
    set(key: `${Hooks_2.Name & string}`, value: any): this;
    on(id: Hooks_2.Name, callback: Hooks_2.Hook): Framework;
    promise(id: Hooks_2.Name, callback: Hooks_2.PromiseHook): Framework;
    filter<T = any>(id: `${Hooks_2.Name & string}`, value?: any): T;
    promised<T = any>(id: `${Hooks_2.Name & string}`, value?: any): Promise<T>;
}

export { }
