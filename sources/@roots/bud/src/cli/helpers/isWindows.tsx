import {platform} from 'node:os'
export const isWindows = () => platform() === `win32`
