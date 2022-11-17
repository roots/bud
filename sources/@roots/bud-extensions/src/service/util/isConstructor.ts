export const isConstructor = (
  f: any,
): f is new (...args: any[]) => any => {
  try {
    Reflect.construct(String, [], f)
  } catch (e) {
    return false
  }
  return true
}
