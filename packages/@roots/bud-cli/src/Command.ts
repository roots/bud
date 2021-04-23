import OclifCommand from '@oclif/command'
import {mergeWith} from 'lodash'

export abstract class Command extends OclifCommand {
  public configMerge(...configs: {[key: string]: any}[]) {
    return configs.reduce((a, c) => mergeWith(a, c), {})
  }
}
