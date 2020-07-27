export { Bud } from "./../types";
export type Dump = (obj: Object) => void;
export type Except = Function;
export type ShortCircuit = () => any;
export type Fab = {
  false: () => boolean;
  true: () => boolean;
  undefined: () => undefined;
  null: () => null;
};
export type Util = {
  dump: Dump;
  except: Except;
  shortCircuit: ShortCircuit;
  fab: Fab;
  terminate: (any) => void;
};
