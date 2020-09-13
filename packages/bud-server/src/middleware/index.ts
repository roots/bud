import dev from './dev'
import proxy from './proxy'
import hot from './hot'

const middleware = {dev, hot, proxy}

export {middleware as default}
