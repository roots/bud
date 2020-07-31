/// <reference types="node" />
import path from 'path';
declare type Repository = any[] | object;
interface ContainerInterface {
    repository: Repository;
    fs: typeof fs;
    new: (this: Container, key: string, repository: Repository) => void;
    get: (this: Container, key: string) => any;
    contents: (this: Container, key: string) => any;
    has: (this: Container, key: string) => boolean;
    is: (this: Container, key: string, value: any) => boolean;
    set: (this: Container, key: string, value: any) => void;
    merge: (this: Container, key: string, value: any) => void;
    delete: (this: Container, key: string) => void;
    enable: (this: Container, key: string) => void;
    enabled: (this: Container, key: string) => boolean;
    disable: (this: Container, key: string) => void;
    disabled: (this: Container, key: string) => boolean;
}
interface FileContainerInterface extends ContainerInterface {
    contents: (this: Container, key: string) => any;
    exists: (this: Container, key: string) => boolean;
}
declare type Container = ContainerInterface;
declare type FileContainer = FileContainerInterface;
declare const fs: {
    path: path.PlatformPath;
    existsSync: any;
};
declare const container: (this: Container, repository: Repository) => void;
declare const fileContainer: (this: FileContainer, repository: Repository) => void;
export { container, fileContainer };
export type { Container, FileContainer, Repository };
//# sourceMappingURL=index.d.ts.map