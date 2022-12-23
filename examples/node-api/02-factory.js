import {join} from 'node:path'
import {factory, instances, get} from '@roots/bud'

/**
 * Run this example with:
 *
 * ```sh
 * yarn node factory.js
 * ```
 */

/**
 * Before anything has ran you should expect {@link instances} to be defined but empty.
 */
console.assert(Object.entries(instances).length === 0)

/**
 * When you use {@link factory} to create a new instance of {@link bud}
 */
const bud = await factory()

/**
 * You can observe our old assertion is no longer valid.
 * {@link bud} was registered to {@link instances}
 */
console.assert(Object.entries(instances).length !== 0)

/**
 * If we call {@link factory} again we get {@link bud} again. This is because
 * we are requesting an instance with the same {@link bud.context.basedir}.
 *
 * We are using the default context so the basedir is the current working directory.
 */
const bud2 = await factory()
console.assert(bud2 === bud)

/** bud.js instance still only created once */
console.assert(Object.keys(instances).length === 1)
console.log(Object.keys(instances))

/**
 * Since they are literally the same object
 * a change made to {@link bud} is a change made to {@link bud2}
 */
bud.setPath(`@dist`, `dist/changed-path`)
console.assert(bud2.path(`@dist`) === bud.path(`@dist`))

/**
 * If we want a separate instance of {@link bud}
 * we can pass a {@link bud.context} with a unique {@link bud.context.basedir}
 */
const bud3 = await factory({basedir: join(process.cwd(), `src/demo`)})

console.assert(bud3 !== bud) // it's a new instance
console.assert(Object.keys(instances).length === 2) // it's registered with a unique key
console.log(Object.keys(instances)) // see for yourself in the terminal

/**
 * Generally you probably don't want multiple instances referring to the same directory.
 * But, we can force a fresh instance regardless of its context by explicitly
 * requesting it with {@link factory}. This might be helpful for testing.
 */

/** normally would return the {@link bud} instance */
const bud4Context = {basedir: process.cwd()}

/** but we'll skip the {@link instances} cache */
const bud4Options = {cache: false}

/** Pass an options object as a second parameter to {@link factory} */
const bud4 = await factory(bud4Context, bud4Options)

/** They are different instances despite sharing the same context */
console.assert(bud4 !== bud)

/** But, note that the new instance is not registered in the {@link instances} registry */
console.assert(Object.keys(instances).length === 2)

/**
 * You can request an instance from the registry using {@link get}
 */
const bud6 = get(process.cwd())
/**
 * The returned instance is the same object referenced by {@link bud} and {@link bud2}
 */
console.assert(bud6 === bud)
console.assert(bud6 === bud2)
