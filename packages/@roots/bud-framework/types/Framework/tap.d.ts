import { Framework } from '..';
interface tap<T = Framework> {
    (fn: Framework.Tapable<T>, bound?: boolean): T;
}
declare const tap: tap<Framework>;
export { tap };
//# sourceMappingURL=tap.d.ts.map