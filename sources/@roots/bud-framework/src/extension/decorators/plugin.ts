export const plugin =
  (plugin: new (...args: any[]) => {apply: CallableFunction}) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public plugin = plugin
    }
