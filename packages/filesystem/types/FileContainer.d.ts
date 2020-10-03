/// <reference types="node" />
import Container from '@roots/container';
import path from 'path';
import globby from 'globby';
import resolveFrom from 'resolve-from';
import watcher from './watcher';
export default class extends Container {
    fs: any;
    repository: Container.Repository;
    glob: typeof globby;
    path: typeof path;
    from: typeof resolveFrom;
    watcher: typeof watcher;
    base: string;
    constructor(baseDir?: string);
    setBase: (dir: string) => void;
    setDisk(glob: string[]): void;
    get(key: string): Container.Item;
    exists: (key: string) => boolean;
    read: (key: string) => string;
    readJson(key: string): unknown;
    write(key: string, content: string): void;
    writeJson(key: string, content: string): void;
    require(key: string): NodeModule;
}
//# sourceMappingURL=FileContainer.d.ts.map