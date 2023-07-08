import Link from '@docusaurus/Link'
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common'
import {translate} from '@docusaurus/Translate'
import {Hero} from '@site/src/components/hero'
import BlogPostItems from '@theme/BlogPostItems'
import Layout from '@theme/Layout'
import SearchMetadata from '@theme/SearchMetadata'
import clsx from 'clsx'
import React from 'react'

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const {selectMessage} = usePluralForm()
  return count =>
    selectMessage(
      count,
      translate(
        {
          description: `Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)`,
          id: `theme.blog.post.plurals`,
          message: `One post|{count} posts`,
        },
        {count},
      ),
    )
}
function useBlogTagsPostsPageTitle(tag) {
  const blogPostsPlural = useBlogPostsPlural()
  return translate(
    {
      description: `The title of the page for a blog tag`,
      id: `theme.blog.tagTitle`,
      message: `{nPosts} tagged with "{tagName}"`,
    },
    {nPosts: blogPostsPlural(tag.count), tagName: tag.label},
  )
}
function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag)
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  )
}
function BlogTagsPostsPageContent({items, listMetadata, sidebar, tag}) {
  const title = useBlogTagsPostsPageTitle(tag)

  return (
    <Layout>
      <header className="margin-bottom--xl">
        {tag.label?.match(/\d*.\d*/) ? (
          <Hero title={`v${tag.label}`} />
        ) : (
          <h1>{title}</h1>
        )}
      </header>

      <div className="container">
        <BlogPostItems items={items} />
      </div>
    </Layout>
  )
}
export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
