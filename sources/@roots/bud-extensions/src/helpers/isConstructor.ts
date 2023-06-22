/**
 * isConstructor
 *
 * This function checks if the given subject is a constructor.
 *
 * @param subject Any JavaScript entity
 * @returns true if subject is a constructor, false otherwise
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
