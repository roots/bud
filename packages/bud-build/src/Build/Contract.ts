import {Container, Framework, Webpack} from '@roots/bud-typings'
import Build from './'
import Loader from '../Loader'
import Item from '../Item'
import Rule from '../Rule'

export default interface Contract {
  /**
   * Bud ref.
   */
  bud: Framework

  /**
   * Builders container
   */
  builders: Partial<Build.Builder>

  /**
   * Loaders container
   */
  loaders: Container

  /**
   * Items container.
   */
  items: Container

  /**
   * Rules container.
   */
  rules: Container

  /**
   * Make build.
   */
  make(): Webpack.Configuration

  /**
   * Add or override a loader by key.
   */
  setLoader(name: string, loader: Loader): Loader

  /**
   * Get a loader by key
   */
  getLoader(name: string): Loader

  /**
   * Ge an item by key.
   */
  getItem(name: string): Item

  /**
   * Add or override an item by key.
   */
  setItem(name: string, module: Item.Module): Item

  /**
   * Get a rule by key.
   */
  getRule(name: string): Rule

  /**
   * Add or override a rule by key.
   */
  setRule(name: string, module: Rule.Module): Rule
}
