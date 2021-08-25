import type { Framework } from './';
interface access<I = any> {
    (this: Framework, value: Framework.Tapable | I): I;
}
declare function access<I = any>(this: Framework, value: Framework.Tapable | I): any;
export { access };
//# sourceMappingURL=access.d.ts.map