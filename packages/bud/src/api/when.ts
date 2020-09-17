import {BudInterface} from '../Bud'

/**
 * ## bud.when
 *
 * Define build steps to be carried out under certain conditions.
 *
 * ```js
 * bud.when(
 *   bud.mode.is('development'),        // test case
 *   bud => dev({host: 'example.com'}), // executes when true
 *   bud => bud.mini(),                 // executes when false
 * )
 */
export type When = (
  this: BudInterface,
  /**
   * Test case.
   */
  test: boolean,
  /**
   * Function to execute when test case is true.
   */
  trueCase: CallableFunction,
  /**
   * Function to execute when test case is false.
   */
  falseCase: CallableFunction | undefined,
) => BudInterface

const when: When = function (
  this: BudInterface,
  test: boolean,
  trueCase: CallableFunction = () => null,
  falseCase: CallableFunction = () => null,
) {
  test === true ? trueCase(this) : falseCase(this)

  return this
}

export {when as default}
