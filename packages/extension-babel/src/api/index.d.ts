import { setPlugins } from './setPlugins';
import { mergeConfig } from './mergeConfig';
import { Framework } from '@roots/bud-typings';
export declare const make: (app: Framework) => void;
export interface BabelConfig {
    app: Framework;
    mergeConfig: typeof mergeConfig;
    setPlugins: typeof setPlugins;
}
//# sourceMappingURL=index.d.ts.map