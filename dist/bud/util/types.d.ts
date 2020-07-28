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
export declare type Util = {
    dump: Dump;
    except: Except;
    shortCircuit: ShortCircuit;
    fab: Fab;
    terminate: (any: any) => void;
    setProcess: (bud: Bud) => void;
};
//# sourceMappingURL=types.d.ts.map