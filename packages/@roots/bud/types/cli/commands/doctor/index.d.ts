import { flags } from '@oclif/command';
import { Framework } from '../../..';
import { Command } from '../../Command';
export default class Doctor extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        cache: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        ci: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        debug: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        log: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        hash: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        manifest: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        minimize: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        target: flags.IOptionFlag<string[]>;
    };
    cli: {
        flags: any;
        args: any;
    };
    app: Framework;
    mode: 'development' | 'production';
    run(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map