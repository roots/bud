import type { Bud } from './types';
import type { WebpackOptimization } from '@roots/bud-typings';
declare type OptimizationBuilder = (bud: Bud) => WebpackOptimization;
/**
 * Webpack optimization
 */
declare const optimization: OptimizationBuilder;
export { optimization };
export type { OptimizationBuilder };
//# sourceMappingURL=optimization.d.ts.map