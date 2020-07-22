import type { Hooks } from './hooks';
import type { Mode } from './mode';
import type { Plugin } from './plugin';
import type { Util } from './util';
import type { State } from './state';
import type { Alias, Auto, Babel, Bundle, Copy, Src, SrcPath, Sync, Watch } from './api';
export declare type Bud = {
    hooks: Hooks;
    util: Util;
    plugin: Plugin;
    mode: Mode;
    state: State | undefined;
    alias: Alias;
    auto: Auto;
    babel: Babel;
    bundle: Bundle;
    copy: Copy;
    src: Src;
    srcPath: SrcPath;
    sync: Sync;
    watch: Watch;
};
/**
 * Bud - asset management framework
 */
export declare const bud: Bud;
//# sourceMappingURL=index.d.ts.map