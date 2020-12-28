/**
 * Data handling.
 */
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
  get,
  has,
  set,
  merge,
} from 'lodash'
import fs from 'fs-extra'
import globby, {GlobTask, GlobbyOptions} from 'globby'
import yargs from 'yargs'
import execa from 'execa'
import express from 'express'
import prettier from 'prettier'
import dotenv from 'dotenv'
import pino from 'pino'
import prettyFormat from 'pretty-format'
import zlib from 'zlib'
import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
} from 'react'
import useSwr, {mutate} from 'swr'
import {
  Box,
  Instance,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
} from 'ink'
import {Props as BoxProps} from 'ink/build/components/Box'
import patchConsole from 'patch-console'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import Gradient from 'ink-gradient'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

import webpack, {Stats, ProgressPlugin} from 'webpack'
import Webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'

import {eslintFormatter} from './util'
import {notify} from './util/notify'
import {dump} from './util/dump'
import InterpolateHtmlPlugin from './util/InterpolateHtmlPlugin'

/**
 * Application services
 */
import {Service, ServiceContainer} from './Service'
import * as build from './build'

export {
  /**
   * Framework service base class.
   */
  Service,
  ServiceContainer,
  /**
   * Build utilities (bud devo)
   */
  build,
  /**
   * Execa
   */
  execa,
  /**
   * Dotenv
   */
  dotenv,
  /**
   * Express
   */
  express,
  /**
   * fs-extra
   */
  fs,
  /**
   * globby
   */
  globby,
  GlobTask,
  GlobbyOptions,
  /**
   * Lodash
   */
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
  get,
  has,
  set,
  merge,
  /**
   * pino
   */
  pino,
  /**
   * Prettier
   */
  prettier,
  /**
   * pretty-format
   */
  prettyFormat,
  /**
   * Webpack
   */
  webpack,
  Webpack,
  ProgressPlugin,
  Stats,
  /**
   * Webpack plugins
   */
  CompressionPlugin,
  /**
   * Middlewares
   */
  webpackDevMiddleware,
  webpackHotMiddleware,
  ProxyMiddleware,
  createProxyMiddleware,
  /**
   * Yargs
   */
  yargs,
  /**
   * Etc.
   */
  zlib,
  /**
   * React
   */
  React,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
  /**
   * SWR
   */
  useSwr,
  mutate,
  /**
   * Ink
   */
  Box,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
  patchConsole,
  Instance,
  BoxProps,
  /**
   * Ink extensions
   */
  Link,
  Gradient,
  Spinner,
  Table,
  useStdoutDimensions,
  /**
   * Grab bag
   */
  eslintFormatter,
  notify,
  dump,
  InterpolateHtmlPlugin,
}
