import {Component, type PropsWithChildren} from '@roots/bud-support/ink'
import logger from '@roots/bud-support/logger'

class ErrorBoundary extends Component {
  public declare state: {hasError: boolean}
  public declare props: PropsWithChildren<{
    compilation?: string
  }>

  public constructor(props: PropsWithChildren) {
    super(props)
    this.state = {hasError: false}
  }

  public static getDerivedStateFromError(error: Error) {
    return {hasError: true}
  }

  public override componentDidCatch(error: Error) {
    logger.error(
      `There was an error rendering the dashboard. This may be an error in bud.js.\nError: ${(error?.message ?? error).trim()}`,
    )

    if (this.props.compilation) {
      process.stdout.write(
        [
          ``,
          `Fallback compilation output:`,
          this.props.compilation,
          ``,
        ].join(`\n\n`),
      )
    }
  }

  public override render() {
    return this.state.hasError ? null : this.props.children
  }
}

export default ErrorBoundary
