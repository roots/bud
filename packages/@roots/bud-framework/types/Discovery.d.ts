import { Service } from './Service';
interface Buddy {
    source: string;
    name: string;
    ver: string;
    type: 'dependencies' | 'devDependencies';
}
interface Repository {
    name: string;
    peers: {
        [key: string]: Buddy;
    };
    extensions: {
        [key: string]: Buddy;
    };
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}
/**
 * @noInherit
 */
export declare abstract class Discovery extends Service<Repository> {
    /**
     * Array of paths for webpack to resolve modules from
     */
    resolveFrom: string[];
    /**
     * Collect packages.
     */
    abstract discover(type: 'dependencies' | 'devDependencies'): void;
    /**
     * Register discovered packages as extensions
     */
    abstract registerDiscovered(): void;
    /**
     * Install packages
     */
    abstract install(): void;
    /**
     * Get aggregated project info
     */
    abstract getProjectInfo(): {
        [key: string]: any;
    };
    /**
     * Returns a boolean representing if
     * the project has a given pkg listed as a dependency
     * or devDependency
     */
    abstract hasPeerDependency(pkg: string): boolean;
}
export {};
//# sourceMappingURL=Discovery.d.ts.map