import notifier, {
  Notification,
  NotificationCallback,
} from 'node-notifier'

export function notify(
  notification: Notification,
  callback?: NotificationCallback,
): void {
  notifier.notify(notification, callback ?? undefined)
}
