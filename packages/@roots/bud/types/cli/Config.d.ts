import { cosmiconfig } from '@roots/bud-support';
import { Framework } from '../';
export declare class Config {
    application: Framework;
    options: cosmiconfig.Options;
    constructor(app: Framework, searchPlaces: cosmiconfig.Options['searchPlaces']);
    get(): Promise<any>;
    apply(): Promise<Framework>;
}
//# sourceMappingURL=Config.d.ts.map