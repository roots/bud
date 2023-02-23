// Font Awesome
import {library, dom} from '@fortawesome/fontawesome-svg-core'

import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

// Add the imported icons to the library
library.add(faAngleDown)

// Tell FontAwesome to watch the DOM and add the SVGs when it detects icon markup
dom.watch()
