export function Page() {
  return (
    <div className="page">
      <PageHeader title="About" />
      <p className="tp-body-1">This example was created by <a href="https://github.com/travis-r6s" target="_blank">Travis Reynolds</a>, and sponsored by <a href="https://vike-cf-pages.pages.dev" target="_blank">StanfordTax</a> </p>
      <p className="tp-body-1">It was created to show how an SSR project could be built with Vike and hosted on Cloudflare Pages, and make use of the edge platform to create a website and API's.</p>
    </div>
  )
}
