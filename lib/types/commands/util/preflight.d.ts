import { BudInterface } from '@roots/bud';
/**
 * Server setup
 */
export declare const dev: (bud: any) => void;
/**
 * Inject hmr loaders
 * @see bud-server
 */
export declare const inject: (bud: BudInterface) => void;
/**
 * Compile build.
 */
export declare const compile: (bud: BudInterface) => void;
