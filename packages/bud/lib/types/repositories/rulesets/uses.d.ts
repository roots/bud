import { Bud } from '../..';
import type { WebpackRule } from '@roots/bud-typings';
/**
 * Module Rule
 */
declare type Use = (bud: Bud) => WebpackRule;
interface UsesHash {
    [key: string]: Use;
}
declare const uses: UsesHash;
export { uses };
export { Use, UsesHash };
//# sourceMappingURL=uses.d.ts.map