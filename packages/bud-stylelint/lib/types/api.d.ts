import type { Bud } from '@roots/bud';
import type { Options as StylelintOptions } from 'stylelint-webpack-plugin/declarations/getOptions';
declare type ConfigCall = (this: Bud, options: {
    enabled?: boolean;
    options?: StylelintOptions;
}) => Bud;
declare const api: ConfigCall;
export default api;
//# sourceMappingURL=api.d.ts.map