import Container from '@roots/container';
import FileContainer from './FileContainer';
declare class FileSystem extends Container {
    current: FileContainer;
    constructor();
    get(key: string): FileContainer;
    ls(key?: string): Container.Item;
    get baseDir(): string;
    set(key: string, options: {
        baseDir: string;
        glob: string[];
    }): FileContainer;
}
export { FileSystem as default };
//# sourceMappingURL=FileSystem.d.ts.map