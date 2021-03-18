import {config} from './config'

export const theme = {
  spacing: config(['theme.spacing', 'APP_THEME_SPACING']),
  colors: {
    foreground: config([
      'theme.colors.foreground',
      'APP_THEME_FOREGROUND',
    ]),
    faded: config(['theme.colors.faded', 'APP_THEME_FADED']),
    primary: config([
      'theme.colors.primary',
      'APP_THEME_PRIMARY',
    ]),
    primaryAlt: config([
      'theme.colors.primaryAlt',
      'APP_THEME_PRIMARY_ALT',
    ]),
    error: config(['theme.colors.error', 'APP_THEME_ERROR']),
    errorAlt: config([
      'theme.colors.errorAlt',
      'APP_THEME_ERROR_ALT',
    ]),
    warning: config([
      'theme.colors.warning',
      'APP_THEME_WARNING',
    ]),
    success: config([
      'theme.colors.success',
      'APP_THEME_SUCCESS',
    ]),
    accent: config(['theme.colors.accent', 'APP_THEME_ACCENT']),
    flavor: config(['theme.colors.flavor', 'APP_THEME_FLAVOR']),
  },
  screens: [
    [
      config(['theme.screens[0][0]', 'APP_THEME_SM_LOWER']),
      config(['theme.screens[0][1]', 'APP_THEME_SM_LOWER']),
    ],
    [
      config(['theme.screens[1][0]', 'APP_THEME_MD_LOWER']),
      config(['theme.screens[1][1]', 'APP_THEME_MD_LOWER']),
    ],
    [
      config(['theme.screens[2][0]', 'APP_THEME_LG_LOWER']),
      config(['theme.screens[2][1]', 'APP_THEME_LG_UPPER']),
    ],
    [
      config(['theme.screens[3][0]', 'APP_THEME_XL_LOWER']),
      config(['theme.screens[3][1]', 'APP_THEME_XL_UPPER']),
    ],
  ],
  columns: 12,
}
