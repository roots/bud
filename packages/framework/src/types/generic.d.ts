
export type Index<T> = {[key: string]: T}

export type Fluent<T> = (this: T, unknown?: unknown) => T
