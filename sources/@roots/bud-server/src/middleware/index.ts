import {dev} from './dev'
import hot from './hot'
import proxy from './proxy'

export const middlewareMap = {
  dev: dev,
  hot: hot,
  factory: proxy,
}
