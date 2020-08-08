import type { Bud } from './types';
/**
 * Dev server
 * @param {Bud} bud
 */
declare const devServer: (bud: Bud) => {
    bud: Bud;
    target: {
        devServer: any;
    };
    make: () => any;
};
export { devServer };
//# sourceMappingURL=devServer.d.ts.map