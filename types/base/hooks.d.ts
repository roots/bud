export declare type Hooks = {
    registered: Object;
    make: Function;
    getAll: Function;
    on: (name: string, callback: Function) => void;
    call: (name: string, params: any) => void;
};
/**
 * Hooks
 */
declare const hooks: Hooks;
export { hooks };
