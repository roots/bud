import Container from '@roots/container';
import FileContainer from './FileContainer';
declare class Filesystem extends Container {
    constructor();
    get(key: string): FileContainer;
    set(key: string, options: {
        baseDir: string;
        glob: string[];
    }): FileContainer;
}
export { Filesystem as default };
//# sourceMappingURL=FileSystem.d.ts.map