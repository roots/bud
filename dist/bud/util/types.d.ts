import { Bud } from './../types';
export type { Bud };
export declare type Dump = (obj: Object) => void;
export declare type Except = Function;
export declare type ShortCircuit = () => any;
export declare type Fab = {
    false: () => boolean;
    true: () => boolean;
    undefined: () => undefined;
    null: () => null;
};
export declare type ProjectRoot = string;
export declare type Util = {
    dump: Dump;
    except: Except;
    shortCircuit: ShortCircuit;
    fab: Fab;
    projectRoot: ProjectRoot;
    terminate: (any: any) => void;
    setProcess: (bud: Bud) => void;
    usedExt: (any: any, bud: Bud) => any[];
};
//# sourceMappingURL=types.d.ts.map