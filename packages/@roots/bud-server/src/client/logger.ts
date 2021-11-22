/* eslint-disable no-console */
export const log = message => {
  console.log(
    `%c [bud-server] %c %c ${message} `,
    'background: #525ddc; color: #ffffff;',
    'background: transparent;',
    'background: white; color: #343a40;',
  )
}
