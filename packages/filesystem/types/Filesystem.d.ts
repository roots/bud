import Container from '@roots/container'
import FileContainer from './FileContainer'
declare class FileSystem extends Container {
  constructor()
  get(key: string): FileContainer
  ls(key?: string): Container.Item
  set(
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ): FileContainer
}
export {FileSystem as default}
//# sourceMappingURL=FileSystem.d.ts.map
