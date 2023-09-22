import '@src/index.css'

/**
 * This dynamically inserted element is not present in `./index.html` but the matching
 * CSS selector will be included in the final bundle because it matches.
 */
document.querySelector(`h2`)?.insertAdjacementHTML(`afterend`, `<h4 class="include">Paragraph</h4>`)

/**
 * This dynamically inserted element's classname is constructed from multiple strings
 * so we'll include a comment to ensure it's not purged.
 */
const classname = [`comment`, `test`].join(`-`) // comment-test
document.querySelector(`h2`)?.insertAdjacentHTML(`afterend`, `<h5 class="${classname}">Paragraph</h5>`)
