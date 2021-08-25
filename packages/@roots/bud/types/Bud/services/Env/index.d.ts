import type { Framework } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
declare class Env extends Service<Framework.Index<any>> {
    name: string;
    bootstrap(): void;
    /**
     * Returns path to .env file
     *
     * @readonly
     */
    get envPath(): string;
    /**
     * get parsed .env
     */
    getParsedEnv(): Framework.Index<any>;
}
export { Env };
//# sourceMappingURL=index.d.ts.map