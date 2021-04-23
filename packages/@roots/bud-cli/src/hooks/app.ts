import {App, services} from '@roots/bud'
import {Build} from '../Build'

export default async function () {
  Build.app = new App().bootstrap(services).lifecycle()
}
