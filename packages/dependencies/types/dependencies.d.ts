import { IDependencyManager } from './';
declare class Dependencies {
    protected dependencies: string[];
    protected path: string;
    constructor(dependencies: string | string[], path?: string);
    get client(): IDependencyManager;
    protected isYarn(): boolean;
}
export { Dependencies as default };
