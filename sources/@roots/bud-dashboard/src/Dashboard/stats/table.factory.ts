import {table} from '@roots/bud-support'

export const make = (data: Array<Array<any>>): string => {
  return table.table(data, {
    border: table.getBorderCharacters('void'),
    singleLine: true,
    columnDefault: {
      alignment: 'left',
      wrapWord: true,
      paddingRight: 2,
      paddingLeft: 0,
    },
  })
}
