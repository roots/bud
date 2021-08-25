import type { Container } from '@roots/container';
import type { Service } from './Service';
export interface Dependencies extends Service {
    /**
     * Installation status
     */
    messages: Container;
    /**
     * Install dependencies
     */
    install(dependencies: {
        name: string;
        ver: string;
        source: string;
        type: 'dependencies' | 'devDependencies';
    }[]): void;
    /**
     * Returns a boolean indicating whether `dep` is
     * required to be installed.
     */
    shouldInstall(dep: string, type: 'dependencies' | 'devDependencies'): boolean;
}
//# sourceMappingURL=Dependencies.d.ts.map