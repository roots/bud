import notifier from 'node-notifier'

const notify = args => {
  return notifier.notify({...args})
}

export {notify}
