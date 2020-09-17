import watchman from 'fb-watchman'
declare type Watchman = any

const client = new watchman.Client()
export {client as default}
