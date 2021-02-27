import {
  React,
  Box,
  BigText,
  Text,
  render,
  Gradient,
} from '@roots/bud-support'
import Commander from 'commander'
import {formatHelp} from './Help'

export default class Output {
  public instance: Commander.Command
  public name: string

  public constructor(name: string, instance: Commander.Command) {
    this.instance = instance.configureHelp({
      formatHelp,
    })

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start">
        <Gradient name="teen">
          <BigText font="tiny" text={this.name} />
        </Gradient>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          paddingX={1}>
          <Text>{str}</Text>
        </Box>
      </Box>,
    )
  }

  public writeErr(str: string) {
    return render(
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start">
        <Gradient name="teen">
          <BigText font="tiny" text={this.name} />
        </Gradient>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          paddingX={1}>
          <Gradient name="morning">
            <Text>{str}</Text>
          </Gradient>
          <Text>{this.instance.helpInformation()}</Text>
        </Box>
      </Box>,
    )
  }
}
