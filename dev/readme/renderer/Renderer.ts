import Reconciler from 'react-reconciler'
import {createElement} from './createElement'

const HostConfig: any = {
  appendInitialChild(instance, child) {
    if (child?.append) {
      child.append(instance)
    }
  },

  createInstance(type, props, handle) {
    return createElement(type, props, handle)
  },

  createTextInstance(text) {
    return text
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false
  },

  getPublicInstance(inst) {
    return inst
  },

  prepareForCommit() {
    return null
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return true
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return {}
  },

  shouldSetTextContent(type, props) {
    return false
  },

  now() {
    return Date.now()
  },

  supportsMutation: true,

  clearContainer(container) {
    container.doc = ``
  },

  appendChildToContainer(container, child) {
    container.append(child)
  },

  appendAllChildren(parent, children) {},
}

export const MarkdownRenderer = Reconciler(HostConfig)
