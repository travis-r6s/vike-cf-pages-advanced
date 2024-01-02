import ReadMe from '#/README.md'

/**
 * This is the homepage, and we import and render the README markdown file component,
 * using it as a content source instead of needing to write the same content in two places.
 *
 * You can use this same method for other pages if needed, just import the markdown files as needed.
 *
 * Powered by: https://github.com/cyco130/vite-plugin-mdx
 */
export function Page() {
  return (
    <div className="page">
      <ReadMe />
    </div>
  )
}
