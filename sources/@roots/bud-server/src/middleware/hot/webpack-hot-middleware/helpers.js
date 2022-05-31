export const pathMatch = function (url, path) {
  try {
    return new URL(url).pathname === path
  } catch (e) {
    return false
  }
}
