import { Instance, Service } from '@roots/bud-support';
import { Framework } from '@roots/bud-typings';
export default class extends Service<Framework> {
    protected _dashboard: Instance;
    protected get dashboard(): Instance;
    protected set dashboard(instance: Instance);
}
//# sourceMappingURL=Service.d.ts.map