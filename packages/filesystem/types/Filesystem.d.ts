import { Container } from '@roots/container';
import { FileContainer } from './FileContainer';
export declare class FileSystem extends Container {
    current: FileContainer;
    repository: Container.Repository;
    constructor();
    get: Container.Get;
    ls(key?: string): Container.Item;
    get baseDir(): string;
    set: Container.Using;
}
//# sourceMappingURL=FileSystem.d.ts.map