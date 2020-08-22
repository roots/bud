import { Loose } from '@roots/bud-typings';
import { Bud } from './';
declare type Repository = any[] | any;
declare type RepositoryDefinition = {
    repository: string;
    contents: Repository;
};
declare type Key = string;
declare type Getter = (this: Container, key?: Key) => any;
declare type Action = (this: Container, ...args: any) => void;
declare type ConditionalCheck = (this: Container, key: Key, value?: any) => boolean;
interface ContainerInterface extends Loose {
    name: string;
    repository: Repository;
    new: Action;
    get: Getter;
    require: () => void;
    has: ConditionalCheck;
    is: ConditionalCheck;
    set: Action;
    map: Action;
    entries: Getter;
    merge: Action;
    delete: Action;
    enable: Action;
    enabled: ConditionalCheck;
    disable: Action;
    disabled: ConditionalCheck;
}
interface FileContainerInterface extends ContainerInterface {
    require: Getter;
    exists: ConditionalCheck;
}
interface ExtensionContainer extends ContainerInterface {
    add: Action;
}
declare type Container = ContainerInterface;
declare type FileContainer = FileContainerInterface;
declare type ContainerBind = (repository: Repository, bud: Bud) => Container | FileContainer | ExtensionContainer;
declare const container: Action;
/**
 * Bind container.
 */
declare const makeContainer: ContainerBind;
/**
 * Bind file container.
 */
declare const makeFileContainer: ContainerBind;
/**
 * Bind extension container.
 */
declare const makeExtensionContainer: ContainerBind;
export { container, makeContainer, makeFileContainer, makeExtensionContainer, };
export type { Container, FileContainer, ExtensionContainer, Repository, RepositoryDefinition, };
//# sourceMappingURL=container.d.ts.map