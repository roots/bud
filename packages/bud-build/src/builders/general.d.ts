/// <reference types="webpack" />
import { Framework, Webpack } from '@roots/bud-typings';
declare type Config = Omit<Webpack.Configuration, 'entry' | 'externals' | 'module' | 'resolve' | 'optimization' | 'plugins' | 'output' | 'string'>;
export declare namespace General {
    type Build = (this: Framework) => Config;
}
export declare const general: General.Build;
export {};
//# sourceMappingURL=general.d.ts.map