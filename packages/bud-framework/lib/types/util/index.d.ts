import { os } from './os';
import type { Dump } from './dump';
export type { Dump };
import type { Fab } from './fab';
export type { Fab };
import type { FS } from './fs';
export type { FS };
import type { ProjectRoot } from './projectRoot';
export type { ProjectRoot };
import type { ShortCircuit } from './shortCircuit';
export type { ShortCircuit };
import type { Terminate } from './terminate';
export type { Terminate };
export declare type Util = {
    fab: Fab;
    fs: FS;
    os: typeof os;
    processHandler: any;
    projectRoot: ProjectRoot;
    dump: Dump;
    notify: any;
    shortCircuit: ShortCircuit;
    terminate: Terminate;
    usedExt: any;
};
export declare const util: Util;
export { logger } from './logger';
//# sourceMappingURL=index.d.ts.map