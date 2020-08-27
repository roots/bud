/// <reference types="node" />
import filesystem from 'fs-extra';
import { URL } from 'url';
import type { PlatformPath } from 'path';
declare type PathLike = string | Buffer | URL;
declare type Exists = (path: PathLike) => boolean;
declare type FS = {
    path: PlatformPath;
    fs: typeof filesystem;
    existsSync: Exists;
};
declare const fs: FS;
export { fs };
export type { FS };
//# sourceMappingURL=fs.d.ts.map