export function Page() {
  return (
    <div className="page">
      <PageHeader title="Styling" />
      <p className="tp-body-1">
        To demonstrate how you might use SCSS in a project with Vite + Vike, this example makes use of the
        {' '}
        <a href="https://thumbprint.design" target="_blank">Thumbprint Design System</a>
        .
        Throughout this example project, we have various SCSS files and import methods; most SCSS files are co-located with components (see
        {' '}
        <code dangerouslySetInnerHTML={{ __html: `/components/button.{scss,tsx}` }} />
        ), and contain CSS styles and/or import CSS files from the
        {' '}
        <code>@thumbtack/thumbprint-scss</code>
        {' '}
        NPM package. These sibling SCSS files are then imported into the JSX file.
        <br />
        As Vite also supports directly importing CSS in JS files, some components do not have a sibling SCSS file, and directly import from the
        {' '}
        <code>@thumbtack/thumbprint-scss</code>
        {' '}
        package.
      </p>
      <br />
      <p className="tp-body-1">
        This project is only an example of what you
        {' '}
        <em>can</em>
        {' '}
        do, not what you
        {' '}
        <em>should</em>
        {' '}
        do - you'll likely want to standardize how you handle styling in your project, and stick to one convention.
      </p>
    </div>
  )
}
