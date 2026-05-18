// CloudFront Function — 301 redirects for legacy URLs.
//
// Runtime: cloudfront-js-2.0
// Association: viewer-request on the CloudFront distribution serving
//              www.nexthireconsulting.com
//
// Why this exists:
//   The previous Webflow site exposed `.html` URLs (and a handful of
//   route names that have since been renamed). Google Search Console
//   keeps flagging them as 404s. The Next.js export uses trailing-slash
//   directory URLs (`/marketing-disclosure/`), so we need a real 301
//   from the legacy URL to the modern one to preserve link equity and
//   recover crawl budget.
//
// What it does:
//   1. Exact-match table of known legacy URLs → modern URL (renames and
//      special cases handled here).
//   2. Generic fallback for any other `*.html` request — strips the
//      `.html`, lowercases (only for non-blog legacy), and appends the
//      trailing slash. For `/blog/*.html` the slug is decoded,
//      lowercased, and normalised (spaces / `&` / `_` → `-`).
//   3. Query strings are preserved across the redirect (utm tracking
//      survives).
//
// Deployment (one-time, AWS console):
//   1. CloudFront → Functions → Create function.
//        Name: nexthire-legacy-redirects
//        Runtime: cloudfront-js-2.0
//   2. Paste the body of this file into the editor → Save → Publish.
//   3. Open the distribution that serves www.nexthireconsulting.com →
//      Behaviors → edit the default (*) behavior.
//   4. Function associations → Viewer request →
//        Function type: CloudFront Functions
//        Function ARN: nexthire-legacy-redirects (latest published)
//      Save changes.
//   5. Verify with curl after a minute (no CloudFront invalidation
//      needed for function updates):
//        curl -sI https://www.nexthireconsulting.com/marketing-disclosure.html
//        # expect: HTTP/2 301  +  location: /marketing-disclosure/
//
// Updating: edit this file, paste into the same CF Function, Publish.
//           Keep this file as the source of truth.

function handler(event) {
  var req = event.request;
  var uri = req.uri;

  // Exact-match table for legacy URLs that need a specific destination
  // (rename, removed route, weird casing/spacing the generic rule can't
  // recover safely).
  var EXACT = {
    // Top-level legal / marketing pages
    '/marketing-disclosure.html':       '/marketing-disclosure/',
    '/cancellation-policy.html':        '/cancellation-policy/',
    '/refund-policy.html':              '/refund-policy/',
    '/terms-of-service.html':           '/terms-of-service/',
    '/privacy-policy.html':             '/privacy-policy/',
    '/data-processing-agreement.html':  '/data-processing-agreement/',
    '/extension-privacy-policy.html':   '/extension-privacy-policy/',

    // Top-level product / marketing pages
    '/success-story.html':              '/success-story/',
    '/candidates.html':                 '/candidates/',
    '/companies.html':                  '/companies/',
    '/for-companies.html':              '/companies/',
    '/pricing.html':                    '/pricing/',
    '/blog.html':                       '/blog/',
    '/index.html':                      '/',
    '/index':                           '/',

    // Routes that were renamed or removed entirely
    '/why-join-nexthire.html':          '/why-nexthire/',   // renamed
    '/talk-to-an-expert.html':          '/contact-us/',     // route removed

    // Blog posts with mixed-case or punctuation in the legacy URL.
    // The generic rule below handles these too, but listing them
    // explicitly makes the intent obvious and surfaces edits.
    '/blog/how-AI-is-reshaping-IT-services.html':
      '/blog/how-ai-is-reshaping-it-services/',
    '/blog/AI%20tools%20&%20how%20they%20help%20you%20getting%20hired.html':
      '/blog/ai-tools-how-they-help-you-getting-hired/',
    '/blog/AI%20tools%20%26%20how%20they%20help%20you%20getting%20hired.html':
      '/blog/ai-tools-how-they-help-you-getting-hired/'
  };

  var qs = buildQueryString(req.querystring);

  if (EXACT[uri]) {
    return redirect301(EXACT[uri] + qs);
  }

  // Generic fallback: any other `*.html` → trailing-slash variant.
  if (uri.length > 5 && uri.slice(-5).toLowerCase() === '.html') {
    var base = uri.slice(0, -5);
    var newPath = null;

    if (base.toLowerCase().indexOf('/blog/') === 0) {
      // Blog: decode + lowercase + normalise separators → slugify.
      var slug = base.slice('/blog/'.length);
      try { slug = decodeURIComponent(slug); } catch (e) { /* keep raw */ }
      slug = slug.toLowerCase()
        .replace(/[\s_+&]+/g, '-')      // spaces, `_`, `+`, `&` → `-`
        .replace(/[^a-z0-9\-]/g, '')    // strip remaining non-slug chars
        .replace(/-+/g, '-')             // collapse runs of `-`
        .replace(/^-|-$/g, '');          // trim leading/trailing `-`
      if (slug) newPath = '/blog/' + slug + '/';
    } else {
      // Non-blog legacy: lowercase the path so `/Pricing.html` → `/pricing/`.
      newPath = base.toLowerCase() + '/';
    }

    if (newPath) return redirect301(newPath + qs);
  }

  return req;
}

function redirect301(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      'location':      { value: location },
      'cache-control': { value: 'public, max-age=86400' }
    }
  };
}

function buildQueryString(querystring) {
  if (!querystring) return '';
  var parts = [];
  for (var key in querystring) {
    var entry = querystring[key];
    if (entry.value !== undefined && entry.value !== null) {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.value));
    }
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.multiValue[i].value));
      }
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}
