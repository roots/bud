export const Label =
  (label: string) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public label = label
    }

export const label = Label
