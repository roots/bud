import type {UserDefinedOptions as Options} from '@fullhuman/postcss-purgecss'

import {Extension} from '@roots/bud-framework/extension'

import type {BudPurgeCSSPublicInterface} from './model.js'

export default class BudPurgeCSSPublicAPI extends Extension<Options> {
  public declare blocklist: BudPurgeCSSPublicInterface[`blocklist`]
  public declare getBlocklist: BudPurgeCSSPublicInterface[`getBlocklist`]
  public declare setBlocklist: BudPurgeCSSPublicInterface[`setBlocklist`]

  public declare content: BudPurgeCSSPublicInterface[`content`]
  public declare getContent: BudPurgeCSSPublicInterface[`getContent`]
  public declare setContent: BudPurgeCSSPublicInterface[`setContent`]

  public declare contentFunction: BudPurgeCSSPublicInterface[`contentFunction`]
  public declare getContentFunction: BudPurgeCSSPublicInterface[`getContentFunction`]
  public declare setContentFunction: BudPurgeCSSPublicInterface[`setContentFunction`]

  public declare dynamicAttributes: BudPurgeCSSPublicInterface[`dynamicAttributes`]
  public declare getDynamicAttributes: BudPurgeCSSPublicInterface[`getDynamicAttributes`]
  public declare setDynamicAttributes: BudPurgeCSSPublicInterface[`setDynamicAttributes`]

  public declare defaultExtractor: BudPurgeCSSPublicInterface[`defaultExtractor`]
  public declare getDefaultExtractor: BudPurgeCSSPublicInterface[`getDefaultExtractor`]
  public declare setDefaultExtractor: BudPurgeCSSPublicInterface[`setDefaultExtractor`]

  public declare extractors: BudPurgeCSSPublicInterface[`extractors`]
  public declare getExtractors: BudPurgeCSSPublicInterface[`getExtractors`]
  public declare setExtractors: BudPurgeCSSPublicInterface[`setExtractors`]

  public declare fontFace: BudPurgeCSSPublicInterface[`fontFace`]
  public declare getFontFace: BudPurgeCSSPublicInterface[`getFontFace`]
  public declare setFontFace: BudPurgeCSSPublicInterface[`setFontFace`]

  public declare keyframes: BudPurgeCSSPublicInterface[`keyframes`]
  public declare getKeyframes: BudPurgeCSSPublicInterface[`getKeyframes`]
  public declare setKeyframes: BudPurgeCSSPublicInterface[`setKeyframes`]

  public declare output: BudPurgeCSSPublicInterface[`output`]
  public declare getOutput: BudPurgeCSSPublicInterface[`getOutput`]
  public declare setOutput: BudPurgeCSSPublicInterface[`setOutput`]

  public declare rejected: BudPurgeCSSPublicInterface[`rejected`]
  public declare getRejected: BudPurgeCSSPublicInterface[`getRejected`]
  public declare setRejected: BudPurgeCSSPublicInterface[`setRejected`]

  public declare rejectedCss: BudPurgeCSSPublicInterface[`rejectedCss`]
  public declare getRejectedCss: BudPurgeCSSPublicInterface[`getRejectedCss`]
  public declare setRejectedCss: BudPurgeCSSPublicInterface[`setRejectedCss`]

  public declare safelist: BudPurgeCSSPublicInterface[`safelist`]
  public declare getSafelist: BudPurgeCSSPublicInterface[`getSafelist`]
  public declare setSafelist: BudPurgeCSSPublicInterface[`setSafelist`]

  public declare skippedContentGlobs: BudPurgeCSSPublicInterface[`skippedContentGlobs`]
  public declare getSkippedContentGlobs: BudPurgeCSSPublicInterface[`getSkippedContentGlobs`]
  public declare setSkippedContentGlobs: BudPurgeCSSPublicInterface[`setSkippedContentGlobs`]

  public declare sourceMap: BudPurgeCSSPublicInterface[`sourceMap`]
  public declare getSourceMap: BudPurgeCSSPublicInterface[`getSourceMap`]
  public declare setSourceMap: BudPurgeCSSPublicInterface[`setSourceMap`]

  public declare stdin: BudPurgeCSSPublicInterface[`stdin`]
  public declare getStdin: BudPurgeCSSPublicInterface[`getStdin`]
  public declare setStdin: BudPurgeCSSPublicInterface[`setStdin`]

  public declare stdout: BudPurgeCSSPublicInterface[`stdout`]
  public declare getStdout: BudPurgeCSSPublicInterface[`getStdout`]
  public declare setStdout: BudPurgeCSSPublicInterface[`setStdout`]

  public declare variables: BudPurgeCSSPublicInterface[`variables`]
  public declare getVariables: BudPurgeCSSPublicInterface[`getVariables`]
  public declare setVariables: BudPurgeCSSPublicInterface[`setVariables`]
}
