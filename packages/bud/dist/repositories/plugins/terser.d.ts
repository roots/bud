import TerserPlugin from 'terser-webpack-plugin';
import type { Bud } from './types';
declare const terser: (bud: Bud) => {
    bud: Bud;
    setOptions: () => any;
    make: () => TerserPlugin;
    when: () => any;
};
export { terser };
//# sourceMappingURL=terser.d.ts.map