import __ from 'lodash'
import {Action, Getter, ConditionalCheck} from '@roots/bud-typings'

const addTo: Action = function (key, item) {
  this.repository[key].push(item)
}

const push: Action = function (item) {
  this.repository.push(item)
}

const get: Getter = function (key) {
  return __.get(this.repository, key)
}

const is: ConditionalCheck = function (key, value) {
  return this.get(key) == value
}

const set: Action = function (key, value) {
  __.set(this.repository, key, value)
}

const has: ConditionalCheck = function (key) {
  return this.repository.hasOwnProperty(key) ? true : false
}

const merge: Action = function (key, value) {
  this.set(key, __.merge(this.get(key), value))
}

const containerMethodDelete: Action = function (key) {
  delete this.repository[key]
}

const enable: Action = function (key) {
  this.repository[key] = true
}

const disable: Action = function (key) {
  this.repository[key] = false
}

const enabled: ConditionalCheck = function (key) {
  return this.is(key, true)
}

const disabled: ConditionalCheck = function (key) {
  return this.is(key, false)
}

const map: Action = function (key, ...params): any {
  return this.get(key).map(...params)
}

const entries: Getter = function () {
  return Object.entries(this.repository)
}

const container = function (repository) {
  this.repository = repository || {}
  this.get = get
  this.set = set

  this.addTo = addTo
  this.has = has
  this.map = map
  this.entries = entries
  this.push = push
  this.merge = merge
  this.delete = containerMethodDelete

  this.is = is
  this.enable = enable
  this.enabled = enabled
  this.disable = disable
  this.disabled = disabled
}

export {container as default}
