/**
 * Dev server
 */
declare const devServer: (bud: Bud) => {
    bud: Bud;
    options: {
        devServer: any;
    };
    make: () => any;
    preHook: () => void;
    postHook: () => void;
};
export { devServer };
import { Bud } from './../bud';
//# sourceMappingURL=devServer.d.ts.map