declare type Repository = any[] | object;
interface Loose {
    [key: string]: any;
}
interface ContainerInterface extends Loose {
    name: string;
    repository: Repository;
    new: (this: Container, key: string, repository: Repository) => void;
    get: (this: Container, key: string) => any;
    contents: (this: Container, key: string) => any;
    has: (this: Container, key: string) => boolean;
    is: (this: Container, key: string, value: any) => boolean;
    set: (this: Container, key: string, value: any) => void;
    map: (this: Container, args: any[]) => any;
    entries: (this: Container) => Repository;
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
interface ExtensionContainer extends ContainerInterface {
    controller: (this: Container, args: any[]) => any;
}
declare type Container = ContainerInterface;
declare type FileContainer = FileContainerInterface;
declare const container: (this: Container, repository: Repository, name?: string) => void;
declare const bindContainer: (repository: Repository, name: string) => Container;
declare const bindFileContainer: (repository: Repository, name: string) => FileContainer;
declare const bindExtensionContainer: (repository: Repository, name: string) => ExtensionContainer;
export { container, bindContainer, bindFileContainer, bindExtensionContainer };
export type { Container, FileContainer, ExtensionContainer, Repository };
//# sourceMappingURL=index.d.ts.map