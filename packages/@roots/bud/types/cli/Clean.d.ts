import { Framework } from '..';
import { Command } from './Command';
export default class Clean extends Command {
    app: Framework;
    cli: {
        flags: any;
        args: any;
    };
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        cache: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        log: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    target: ['all' | 'storage' | 'dist', string?];
    run(): Promise<void>;
}
//# sourceMappingURL=Clean.d.ts.map