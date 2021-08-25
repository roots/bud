import { Container } from '@roots/container';
interface container<T = any> {
    <T>(repository?: T): Container<T>;
}
declare const container: <T = any>(repository?: T) => Container<T>;
export { container };
//# sourceMappingURL=container.d.ts.map