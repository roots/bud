/**
 * Patch globals
 */
import './patch'

/**
 * Application dev util
 */
import * as build from './build'
import {dump} from './util/dump'
import {killPort} from './util/killPort'
export {build, dump, killPort}

/**
 * Application services base.
 */
export {Service} from './Service'

/**
 * Application util
 */
export {notify} from './util/notify'
export {maybeAppend} from './util/maybeAppend'
export * as wpPkgs from './util/wordpressPkgs'

/**
 * Webpack
 */
import webpack from 'webpack'
export {webpack}
import type Webpack from 'webpack'
export type {Webpack}

// Plugins
export {ProgressPlugin, Stats} from 'webpack'

import InterpolateHtmlPlugin from './util/InterpolateHtmlPlugin'
export {InterpolateHtmlPlugin}

// Middlewares
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'
export {
  ProxyMiddleware,
  createProxyMiddleware,
  webpackHotMiddleware,
  webpackDevMiddleware,
}
// Middlewares types
import type WebpackHotMiddleware from 'webpack-hot-middleware'
import type WebpackDevMiddleware from 'webpack-dev-middleware'
export {WebpackHotMiddleware, WebpackDevMiddleware}

/**
 * Lodash
 */
import type Lodash from 'lodash'
import lodash, {
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  isNull,
  isUndefined,
  merge,
  get,
  set,
  has,
  join,
} from 'lodash'
export {
  lodash,
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  isNull,
  isUndefined,
  merge,
  get,
  set,
  has,
  join,
}

// lodash typings
export type {Lodash}

/**
 * React
 */
import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
} from 'react'

export {
  React,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
}

/**
 * Ink
 */
export {
  Box,
  Instance,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
  Static,
} from 'ink'
export type {Props as BoxProps} from 'ink/build/components/Box'

/**
 * Ink extensions
 */
import BigText from 'ink-big-text'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import Gradient from 'ink-gradient'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import patchConsole from 'patch-console'
export {
  BigText,
  Link,
  Spinner,
  Table,
  Gradient,
  useStdoutDimensions,
  patchConsole,
}

/**
 * React hooks/util.
 */
import useSWR, {mutate} from 'swr'
export {useSWR, useSWR as useSwr, mutate}

/**
 * Dependencies
 */
import chalk from 'chalk'
import chokidar from 'chokidar'
import dotenv from 'dotenv'
import execa from 'execa'
import express from 'express'
import fs from 'fs-extra'
import globby from 'globby'
import pino from 'pino'
import prettier from 'prettier'
import prettyFormat from 'pretty-format'
import yargs from 'yargs'
import {Signale, SignaleConfig, SignaleOptions} from 'signale'
export {
  chalk,
  chokidar,
  dotenv,
  execa,
  express,
  fs,
  globby,
  pino,
  prettier,
  prettyFormat,
  Signale,
  SignaleConfig,
  SignaleOptions,
  yargs,
}

export type {execa as Execa}
export type {GlobTask, GlobbyOptions} from 'globby'
