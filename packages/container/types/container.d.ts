export interface Loose {
    [key: string]: any | any[] | Loose | Loose[];
}
export declare type Getter = (this: Container, key: string) => Loose;
export declare type Action = (this: Container, ...args: any) => void;
export declare type ConditionalCheck = (this: Container, key: string, value?: any) => boolean;
declare class Container implements Loose {
    repository: Loose;
    constructor(repository?: Loose);
    add: Action;
    push: Action;
    get(this: Container, key: string): any;
    is: ConditionalCheck;
    set: Action;
    has: ConditionalCheck;
    merge: Action;
    deleteBind: Action;
    enable: Action;
    disable: Action;
    enabled: ConditionalCheck;
    disabled: ConditionalCheck;
    map: Action;
    entries: (this: Container) => Loose;
    requireBind: Action;
}
export { Container as default };
//# sourceMappingURL=container.d.ts.map