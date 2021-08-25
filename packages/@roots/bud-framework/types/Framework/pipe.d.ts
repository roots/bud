import { Framework } from '..';
interface Callback<T = Framework> {
    (input: T): T;
}
interface pipe {
    <T = Framework>(fns: Callback<T>[], value?: T): T;
}
declare function pipe<T = Framework>(fns: Callback<T>[], value?: T): T;
export { pipe };
//# sourceMappingURL=pipe.d.ts.map