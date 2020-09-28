import Container from './Container';
export declare type Item = any | Loose | Loose[];
export interface Loose {
    [key: string]: Item;
}
/**
 * Generic store.
 *
 * @typedef ContainerInterface
 * @extends Loose
 */
export interface ContainerInterface extends Loose {
    repository: Loose;
    /**
     * Push a new value onto an array item
     */
    add(this: ContainerInterface, key: string, item: Item): void;
    /**
     * Push a new value onto an array item
     */
    push(this: ContainerInterface, key: string, item: Item): void;
    /**
     * Get a value
     */
    get(this: ContainerInterface, key: string): Item;
    /**
     * Check a value
     */
    is(this: ContainerInterface, key: string, value: Item): boolean;
    /**
     * Set a value
     */
    set(this: ContainerInterface, key: string, value: Item): void;
    /**
     * Check if an item exists in the repository.
     */
    has(this: ContainerInterface, key: string): boolean;
    /**
     * Merge an item value.
     */
    merge(this: ContainerInterface, key: string, value: Item): void;
    /**
     * Delete an item from the repository
     */
    delete(this: ContainerInterface, key: string): void;
    /**
     * Set an item to true
     */
    enable(this: ContainerInterface, key: string): void;
    /**
     * Set an item to false
     */
    disable(this: ContainerInterface, key: string): void;
    /**
     * Set if an item is true
     */
    enabled(this: ContainerInterface, key: string): boolean;
    /**
     * Check if an item is false
     */
    disabled(this: ContainerInterface, key: string): boolean;
    /**
     * Map a callback onto an iterable item
     */
    map(this: ContainerInterface, key: string, callback: (params: unknown) => unknown): unknown;
    /**
     * Get all of the repository contents
     */
    entries(this: ContainerInterface): Loose;
}
export default Container;
