/// <reference types="webpack" />
import Service from './Service';
import { Mode, Webpack } from '@roots/bud-typings';
export default class extends Service implements Mode {
    /**
     * Service registration
     */
    register(): void;
    /**
     * Service boot
     */
    boot(): void;
    /**
     * Get mode
     */
    get(): Webpack.Configuration['mode'];
    /**
     * Set mode
     */
    set(mode: Webpack.Configuration['mode']): void;
    /**
     * Conditional check
     */
    is(check: Webpack.Configuration['mode']): boolean;
}
//# sourceMappingURL=index.d.ts.map