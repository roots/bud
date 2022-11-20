export default async bud => {
  bud
    .entry({
      normal: {
        import: [`@src/foo`],
      },
    })

    .entry({
      simple: [`@src/foo`],
    })

    .entry({
      mixedNormal: {
        import: [`@src/foo`],
      },
      mixedSimple: [`@src/foo`],
    })
}
