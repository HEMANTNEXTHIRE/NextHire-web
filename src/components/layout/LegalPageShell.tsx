type LegalPageShellProps = {
  title: string
  subtitle?: string | null
  lastUpdated: string
  /** Raw HTML from legal CMS — structure only; typography from `.nh-legal-prose` in globals */
  html: string
}

/**
 * Shared layout for Privacy, Terms, DPA, Marketing Disclosure — matches contact/candidates thesis
 * (mint hero band, Playfair title via globals, readable prose). Does not alter legal copy.
 */
export default function LegalPageShell({ title, subtitle, lastUpdated, html }: LegalPageShellProps) {
  return (
    <main className="nh-legal-page">
      <section id="nh-legal-hero" className="nh-legal-page__hero" aria-labelledby="nh-legal-page-title">
        <div className="nh-legal-page__hero-bg" aria-hidden />
        <div className="nh-legal-page__hero-inner">
          <h1 id="nh-legal-page-title" className="nh-legal-page__title">
            {title}
          </h1>
          {subtitle ? <p className="nh-legal-page__lead">{subtitle}</p> : null}
          <p className="nh-legal-page__updated">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <article className="nh-legal-page__article">
        <div className="nh-legal-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  )
}
