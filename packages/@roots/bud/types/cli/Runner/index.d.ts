import type { Framework } from '@roots/bud-framework';
declare class Runner {
    app: Framework;
    cli: any;
    mode: 'development' | 'production';
    constructor(cli: any, options: any);
    make(build?: boolean): Promise<Framework>;
    build(configs: any): Promise<void>;
    setEnv(env: 'production' | 'development'): void;
    doBuilders(): Promise<void>;
    doStatics(): Promise<void>;
}
export { Runner };
//# sourceMappingURL=index.d.ts.map