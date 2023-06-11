import Head from '@docusaurus/Head'
import {useLocation} from '@docusaurus/router'
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common'
import {
  DEFAULT_SEARCH_TAG,
  keyboardFocusedClassName,
  useAlternatePageUtils,
} from '@docusaurus/theme-common/internal'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import SearchMetadata from '@theme/SearchMetadata'
import React from 'react'

// TODO move to SiteMetadataDefaults or theme-common ?
// Useful for i18n/SEO
// See https://developers.google.com/search/docs/advanced/crawling/localized-versions
// See https://github.com/facebook/docusaurus/issues/3317
function AlternateLangHeaders() {
  const {
    i18n: {defaultLocale, localeConfigs},
  } = useDocusaurusContext()
  const alternatePageUtils = useAlternatePageUtils()
  // Note: it is fine to use both "x-default" and "en" to target the same url
  // See https://www.searchviu.com/en/multiple-hreflang-tags-one-url/
  return (
    <Head>
      {Object.entries(localeConfigs).map(([locale, {htmlLang}]) => (
        <link
          href={alternatePageUtils.createUrl({
            fullyQualified: true,
            locale,
          })}
          hrefLang={htmlLang}
          key={locale}
          rel="alternate"
        />
      ))}
      <link
        href={alternatePageUtils.createUrl({
          fullyQualified: true,
          locale: defaultLocale,
        })}
        hrefLang="x-default"
        rel="alternate"
      />
    </Head>
  )
}
// Default canonical url inferred from current page location pathname
function useDefaultCanonicalUrl() {
  const {
    siteConfig: {url: siteUrl},
  } = useDocusaurusContext()
  const {pathname} = useLocation()
  return siteUrl + useBaseUrl(pathname)
}
// TODO move to SiteMetadataDefaults or theme-common ?
function CanonicalUrlHeaders({permalink}: {permalink?: string}) {
  const {
    siteConfig: {url: siteUrl},
  } = useDocusaurusContext()
  const defaultCanonicalUrl = useDefaultCanonicalUrl()
  const canonicalUrl = permalink
    ? `${siteUrl}${permalink}`
    : defaultCanonicalUrl
  return (
    <Head>
      <meta content={canonicalUrl} property="og:url" />
      <link href={canonicalUrl} rel="canonical" />
    </Head>
  )
}

export default function SiteMetadata() {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext()
  // TODO maybe move these 2 themeConfig to siteConfig?
  // These seems useful for other themes as well
  const {image: defaultImage, metadata} = useThemeConfig()
  return (
    <>
      <Head>
        <meta content="summary_large_image" name="twitter:card" />
        {/* The keyboard focus class name need to be applied when SSR so links
        are outlined when JS is disabled */}
        <body className={keyboardFocusedClassName} />
      </Head>

      {defaultImage && <PageMetadata image={defaultImage} />}

      <CanonicalUrlHeaders />

      <AlternateLangHeaders />

      <SearchMetadata locale={currentLocale} tag={DEFAULT_SEARCH_TAG} />

      {/*
          It's important to have an additional <Head> element here, as it allows
          react-helmet to override default metadata values set in previous <Head>
          like "twitter:card". In same Head, the same meta would appear twice
          instead of overriding.
        */}
      <Head>
        {/* Yes, "metadatum" is the grammatically correct term */}
        {metadata.map((metadatum, i) => (
          <meta key={i} {...metadatum} />
        ))}

        <script type="application/ld+json">{`{
           "@context": "https://schema.org",
           "@type": "WebSite",
           "url": "https://bud.js.org/",
           "name": "bud.js",
           "alternateName": "Bud"
         }`}</script>
      </Head>
    </>
  )
}
