process.on(`unhandledRejection`, reason => {
  // eslint-disable-next-line no-console
  console.error(`FAILED TO HANDLE PROMISE REJECTION`)
  throw reason
})
