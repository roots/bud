/// <reference types="node" />
import path from 'path';
import filesystem from 'fs-extra';
import globby from 'globby';
import resolveFrom from 'resolve-from';
import Container from '@roots/container';
import watcher from './watcher';
export interface Loose {
    [key: string]: any | any[] | undefined | CallableFunction;
}
/** File container */
declare class FileContainer extends Container {
    fs: typeof filesystem;
    glob: typeof globby;
    path: typeof path;
    from: typeof resolveFrom;
    watcher: typeof watcher;
    base: string;
    constructor(baseDir?: string);
    setBase(dir: string): void;
    require(key: string): void;
    exists(key: string): boolean;
    setDisk(glob: string[]): void;
    get(this: FileContainer, key: string): any;
    project(key: string): string;
    read(key: string): string;
    readJson(key: string): any;
    write(key: string, content: string): void;
    writeJson(key: string, content: string): void;
}
export { FileContainer as default };
//# sourceMappingURL=index.d.ts.map