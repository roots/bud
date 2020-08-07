import { Bud } from './types';
declare const plugins: (bud: Bud) => {
    bud: Bud;
    adapters: any;
    controller: any;
    target: {
        plugins: any[];
    };
    make: () => any;
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map