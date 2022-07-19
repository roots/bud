import table from 'table'

export const make = (data: Array<Array<any>>): string => {
  return table.table(data, {
    border: table.getBorderCharacters('void'),
    singleLine: true,
    columnDefault: {
      alignment: 'left',
      wrapWord: false,
      paddingRight: 2,
      paddingLeft: 0,
      verticalAlignment: 'middle',
    },
  })
}
