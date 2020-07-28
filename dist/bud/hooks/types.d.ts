export declare type Hooks = {
    registered: RegisteredHooks;
    make: Function;
    getAll: () => any[];
    on: (name: string, callback: Function) => void;
    call: (name: string, params: any) => void;
};
export declare type RegisteredHooks = {
    [name: string]: Hook[];
};
export declare type Hook = {
    fn: () => any;
    fired: boolean;
};
//# sourceMappingURL=types.d.ts.map