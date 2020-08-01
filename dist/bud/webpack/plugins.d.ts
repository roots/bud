import { Bud } from './types';
declare const plugins: (bud: Bud) => {
    bud: Bud;
    adapters: any;
    controller: any;
    make: () => {
        plugins: any;
    };
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map