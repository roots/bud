import type { Build, Framework } from '@roots/bud-framework';
import { Base } from '../shared/Base';
export declare class Loader extends Base implements Build.Loader {
    protected src: Build.Loader.Src;
    constructor(src: Build.Loader.Input);
    make(app: Framework): string;
}
//# sourceMappingURL=index.d.ts.map