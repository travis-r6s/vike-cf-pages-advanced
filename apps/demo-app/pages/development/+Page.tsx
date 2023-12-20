import '@thumbtack/thumbprint-scss/button.css'
import '@thumbtack/thumbprint-scss/input-row.css'
import '@thumbtack/thumbprint-scss/input.css'
import '@thumbtack/thumbprint-scss/label.css'

/** This is an example of a page that will only be rendered in development - see the guard file for more information. */
export function Page() {
  return (
    <div>
      <PageHeader title="Development Only Page" />
      <p className="tp-body-1">
        This page is only available in development mode (
        <code>NODE_ENV=development</code>
        ).
      </p>
      <br />
      <p className="tp-body-1">
        It makes use of Vike
        {' '}
        <a href="https://vike.dev/guard">guard hooks</a>
        {' '}
        (see the sibling
        {' '}
        <code>+guard.ts</code>
        {' '}
        file) to check the current environment with
        {' '}
        <code>import.meta.env</code>
        , and forces a redirect if in production. As Vite + Vike automatically chunk all pages, and the guards run serverside, this page should never load in production.
      </p>
      <br />
      <h2 className="tp-title-3">Example</h2>
      <p className="tp-body-1">Some internal tool to add fake data to your local environment.</p>
      <br />
      <form>
        <label htmlFor="upload" className="tp-label">Select a CSV file to import</label>
        <div className="tp-input-row tp-input-row--button-stretch">
          <input id="upload" type="file" className="tp-text-input" placeholder="Select a CSV file" />
          <button className="tp-button">Get Started</button>
        </div>
      </form>
    </div>
  )
}
