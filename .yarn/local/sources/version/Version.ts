interface V {
  major: string
  minor: string
  patch: string
  tag?: string
  increment?: string
}

class Version {
  public major: V['major']
  public minor: V['minor']
  public patch: V['patch']
  public increment: V['increment']
  public tag: V['tag']

  public get string(): string {
    const v = `${this.major}.${this.minor}.${this.patch}`

    if (
      this.tag &&
      this.tag !== 'stable' &&
      this.tag !== 'latest'
    ) {
      return v.concat(
        `-${this.tag}${
          this.increment ? `.${this.increment}` : ``
        }`,
      )
    }

    return v
  }

  public get object(): V {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      increment: this.increment,
      tag: this.tag,
    }
  }

  public get setCommand() {
    let command = `yarn workspaces foreach --no-private version ${this.string}`
    if (this.tag) command = command.concat(` --tag ${this.tag}`)

    return command
  }

  public constructor(versionStr: string) {
    const [, major, minor, patch]: RegExpMatchArray =
      versionStr.match(/(\d*)\.(\d*)\.(\d*)/)

    this.major = major
    this.minor = minor
    this.patch = patch

    const tag = versionStr.match(/.*-(next|feature-\w*)\.?/)
    this.tag = tag && tag[1] ? tag[1] : `stable`

    const increment = versionStr.match(
      /.*-(next|feature-\w*)\.(\d*)?/,
    )
    this.increment =
      increment && increment[2] ? increment[2] : null
  }

  public setTag(tag: string) {
    if (
      tag !== 'stable' &&
      tag !== 'latest' &&
      tag !== 'next' &&
      !tag.startsWith('feature-')
    )
      throw new Error(`Invalid tag specified: ${tag}`)

    this.tag = tag
  }
}

export {Version, V}
