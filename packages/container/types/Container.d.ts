import { ContainerInterface, Item, Loose } from '.';
/**
 * Keyed item store.
 */
declare class Container implements ContainerInterface {
    repository: Loose;
    constructor(repository?: Loose);
    /**
     * Push a new value onto an array item
     *
     * @deprecated
     */
    add(this: ContainerInterface, key: string, item: Item): void;
    /**
     * Push a new value onto an array item
     */
    push(this: ContainerInterface, key: string, item: Item): void;
    /**
     * Get a value of a repository item.
     */
    get(this: ContainerInterface, key: string): Item;
    /**
     * Check the value for a given key
     */
    is(this: ContainerInterface, key: string, value: Item): boolean;
    /**
     * Check if a given key is true
     */
    isTrue(this: ContainerInterface, key: string): boolean;
    /**
     * Check if a given key is truthy
     */
    isTruthy(this: ContainerInterface, key: string): boolean;
    /**
     * Set the value of a key
     */
    set(this: ContainerInterface, key: string, value: Item): void;
    has(this: ContainerInterface, key: string): boolean;
    merge(this: ContainerInterface, key: string, value: Item): void;
    delete: ContainerInterface['delete'];
    enable(this: ContainerInterface, key: string): void;
    disable(this: ContainerInterface, key: string): void;
    enabled(this: ContainerInterface, key: string): boolean;
    disabled(this: ContainerInterface, key: string): boolean;
    map(this: ContainerInterface, key: string, callback: (params: unknown) => unknown): unknown;
    each(this: ContainerInterface, callback: (value: any, index: number, array: any[]) => void, key?: string): unknown;
    /**
     * Get all of the repository contents
     */
    entries(): Loose;
}
export { Container as default };
