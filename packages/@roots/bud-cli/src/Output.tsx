import {React, Text, render, Gradient} from '@roots/bud-support'
import Commander from 'commander'
import {Layout} from './Layout'

export default class Output {
  public instance: Commander.Command
  public name: string

  public constructor(name: string, instance: Commander.Command) {
    this.name = name
  }

  /**
   * Output configuration
   */
  public get config() {
    return {
      writeOut: this.writeOut.bind(this),
      writeErr: this.writeErr.bind(this),
    }
  }

  public writeOut(str: string) {
    return render(
      <Layout name={this.name}>
        <Text>{str}</Text>
      </Layout>,
    )
  }

  public writeErr(str: string) {
    return render(
      <Layout name={this.name}>
        <Gradient name="morning">
          <Text>{str}</Text>
        </Gradient>
        <Text>{str}</Text>
      </Layout>,
    )
  }
}
