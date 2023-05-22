/**
 * isConstructor
 *
 * @param subject Any js entity
 * @returns true if subject is a constructor
 */
export const isConstructor = (
  subject: any,
): subject is new (...args: any[]) => any => {
  try {
    Reflect.construct(String, [], subject)
  } catch (e) {
    return false
  }
  return true
}
