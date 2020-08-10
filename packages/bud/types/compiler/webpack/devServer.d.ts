import type { Bud } from './types';
import { Configuration } from 'webpack';
/**
 * Dev server
 * @param {Bud} bud
 */
declare const devServer: (bud: Bud) => {
    bud: Bud;
    target: {
        devServer: any;
    };
    make: () => Configuration['devServer'];
};
export { devServer };
//# sourceMappingURL=devServer.d.ts.map