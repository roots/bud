import Container, { ContainerInterface, Item } from '@roots/container';
import { FileContainerInterface } from './';
declare class Filesystem extends Container {
    constructor();
    get(this: ContainerInterface, key: string): Item;
    set(this: ContainerInterface, key: string, options: {
        baseDir: string;
        glob: string[];
    }): FileContainerInterface;
}
export { Filesystem as default };
