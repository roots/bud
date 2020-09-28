/// <reference types="node" />
import path from 'path';
import filesystem from 'fs-extra';
import globby from 'globby';
import resolveFrom from 'resolve-from';
import Container, { ContainerInterface, Item } from '@roots/container';
import watcher from './watcher';
import { FileContainerInterface } from './';
declare class FileContainer extends Container implements FileContainerInterface {
    fs: typeof filesystem;
    glob: typeof globby;
    path: typeof path;
    from: typeof resolveFrom;
    watcher: typeof watcher;
    base: string;
    constructor(baseDir?: string);
    setBase: FileContainerInterface['setBase'];
    setDisk(this: ContainerInterface, glob: string[]): void;
    get(this: ContainerInterface, key: string): Item;
    exists: FileContainerInterface['exists'];
    read: FileContainerInterface['read'];
    readJson(key: string): unknown;
    write(key: string, content: string): void;
    writeJson(key: string, content: string): void;
    require(this: ContainerInterface, key: string): NodeModule;
}
export { FileContainer as default };
