const isWin = /^win/.test(process.platform)
const isMac = /^darwin/.test(process.platform)

const os = {
  isWin,
  isMac,
}

export {os}
