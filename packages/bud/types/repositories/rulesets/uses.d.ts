import { Bud } from '../..';
import type { RuleSetRule } from 'webpack';
/**
 * Module Rule
 */
declare type Use = (bud: Bud) => RuleSetRule;
interface UsesHash {
    [key: string]: Use;
}
declare const uses: UsesHash;
export { uses };
export { Use, UsesHash };
//# sourceMappingURL=uses.d.ts.map