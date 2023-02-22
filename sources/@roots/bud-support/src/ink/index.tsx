import Ink from 'ink'
import Link from 'ink-link'
import {render as renderTest} from 'ink-testing-library'
import React from 'react'

import * as Input from './ink-text-input/index'

export {React, useState, useEffect}
export {Renderer}
export {renderTest}
export {Input, Link}
export default Ink

const {useState, useEffect} = React

class Renderer {
  public declare instance: Ink.Instance | undefined

  public constructor(public stdout: NodeJS.WriteStream) {
    this.cleanup = this.cleanup.bind(this)
    this.once = this.once.bind(this)
    this.text = this.text.bind(this)
    this.render = this.render.bind(this)
    this.getInstance = this.getInstance.bind(this)
  }

  public async cleanup() {
    this.instance?.cleanup()
    this.instance?.unmount()
  }

  public async once(Element: React.ReactNode) {
    try {
      this.render(
        <Ink.Static items={[Element]}>
          {(Item, i) => <Ink.Box key={i}>{Item}</Ink.Box>}
        </Ink.Static>,
      )
    } catch (error) {
      return this.instance
    }
  }

  public async text(text: string) {
    try {
      this.render(<Ink.Text>{text}</Ink.Text>)
      return this.instance
    } catch (error) {
      return this.instance
    }
  }

  public async render(Element: React.ReactElement) {
    try {
      if (this.instance) await this.cleanup()
      this.instance = Ink.render(Element, {stdout: this.stdout})
      return this.instance
    } catch (error) {
      return this.instance
    }
  }

  public getInstance() {
    return this.instance
  }
}
