import {isUndefined} from 'lodash'
import {expect} from 'vitest'

export default (json: Record<string, any>) => {
  expect(json).toEqual(
    expect.objectContaining({
      __generated__: expect.stringContaining(
        `⚠️ This file is generated. Do not edit.`,
      ),
      $schema: `https://schemas.wp.org/trunk/theme.json`,
      version: 2,
    }),
  )

  if (!isUndefined(json.settings?.color?.custom)) {
    expect(json.settings.color.custom).toEqual(expect.any(Boolean))
  }

  if (!isUndefined(json.settings?.color?.customGradient)) {
    expect(json.settings.color.customGradient).toEqual(expect.any(Boolean))
  }

  if (!isUndefined(json.settings?.color?.gradients)) {
    expect(json.settings.color.gradients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gradient: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
        }),
      ]),
    )
  }

  if (!isUndefined(json.settings?.color?.palette)) {
    expect(json.settings.color.palette).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: expect.stringMatching(/^#[\d|\w]{6}$/),
          name: expect.any(String),
          slug: expect.any(String),
        }),
      ]),
    )
  }

  if (!isUndefined(json.settings?.custom?.spacing)) {
    expect(json.settings.custom).toEqual(expect.any(Object))
  }

  if (!isUndefined(json.settings?.custom?.typography?.[`font-size`])) {
    expect(json.settings.custom.typography[`font-size`]).toEqual(
      expect.any(Object),
    )
  }

  if (!isUndefined(json.settings?.custom?.typography?.[`line-height`])) {
    expect(json.settings.custom.typography[`line-height`]).toEqual(
      expect.any(Object),
    )
  }

  if (!isUndefined(json.settings?.spacing?.padding)) {
    expect(json.settings.spacing.padding).toEqual(expect.any(Boolean))
  }

  if (!isUndefined(json.settings?.spacing?.units)) {
    expect(json.settings.spacing.units).toEqual(
      expect.arrayContaining([expect.any(String)]),
    )
  }

  if (!isUndefined(json.settings?.typography?.customFontSize)) {
    expect(json.settings.typography.customFontSize).toEqual(
      expect.any(Boolean),
    )
  }

  if (!isUndefined(json.settings?.typography?.dropCap)) {
    expect(json.settings.typography.dropCap).toEqual(expect.any(Boolean))
  }

  if (!isUndefined(json.settings?.typography?.fontFamilies)) {
    expect(json.settings.typography.fontFamilies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontFamily: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
        }),
      ]),
    )
  }

  if (!isUndefined(json.settings?.typography?.fontSizes)) {
    expect(json.settings.typography.fontSizes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          size: expect.any(String),
          slug: expect.any(String),
        }),
      ]),
    )
  }
}
