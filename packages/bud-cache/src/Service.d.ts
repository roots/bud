import { Service } from '@roots/bud-support';
import { Framework } from '@roots/bud-typings';
export default abstract class extends Service<Framework> {
    abstract enabled(): boolean;
    abstract setCache(): void;
}
//# sourceMappingURL=Service.d.ts.map