import { flags } from '@oclif/command';
import { Framework } from '..';
import { Command } from './Command';
export default class Build extends Command {
    static description: string;
    mode: 'development' | 'production';
    cli: {
        flags: any;
        args: any;
    };
    app: Framework;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        cache: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        ci: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        discover: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        install: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        log: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        hash: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        manifest: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        minimize: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        target: flags.IOptionFlag<string[]>;
    };
    run(): Promise<void>;
}
//# sourceMappingURL=Build.d.ts.map