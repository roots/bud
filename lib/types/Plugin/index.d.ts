import Bud from '@roots/bud-types';
import { Loose } from '@roots/container';
declare class PluginController {
    bud: Bud;
    plugin: any;
    options: Loose;
    constructor(app: Bud, plugin: Bud.Plugin.Factory);
    build(): unknown | void;
    setOptions(): void;
    mergeOptions(): void;
    make(): unknown;
}
export { PluginController as default };
