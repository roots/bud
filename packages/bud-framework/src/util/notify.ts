import notifier, {
  Notification,
  NotificationCallback,
} from 'node-notifier'

const notify = (
  notification: Notification,
  callback?: NotificationCallback,
): void => {
  notifier.notify(notification, callback ?? undefined)
}

export {notify as default}
