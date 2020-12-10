import { FileContainer } from '..';
export declare class FileSystem {
    current: FileContainer;
    repository: {
        [key: string]: FileContainer;
    };
    constructor();
    get(key?: string): any;
    has(key: string): boolean;
    ls(key?: string): any;
    set(key: string, options: {
        base: string;
        glob: string[];
    }): this['current'];
}
//# sourceMappingURL=index.d.ts.map