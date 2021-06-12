import _ from 'lodash'
import Base from './Base'

export abstract class Extension extends Base {
  public abstract register(): Extension

  public abstract boot(): Extension
}
