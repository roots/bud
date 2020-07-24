export { Bud } from './../types';
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
};
//# sourceMappingURL=types.d.ts.map