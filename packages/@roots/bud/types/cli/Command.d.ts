import Base from '@oclif/command';
import { Notifier } from './Notifier';
declare abstract class Command extends Base {
    notifier: Notifier;
    init(): Promise<void>;
}
export { Command };
//# sourceMappingURL=Command.d.ts.map