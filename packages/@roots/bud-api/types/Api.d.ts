import {Service} from '@roots/bud-framework'
import {Repository} from './repository'
interface Api extends Service<Repository> {
  repository: Repository
  bootstrap(): void
}
declare class Api extends Service<Repository> {
  name: string
  repository: Repository
}
export {Api}
//# sourceMappingURL=Api.d.ts.map
