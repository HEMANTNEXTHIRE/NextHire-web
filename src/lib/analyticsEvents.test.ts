import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scrubUrl, scrubEvent, scrubbedUrlProps, appLinkClick } from './analyticsEvents.ts'

test('query strings and hashes are dropped, the path is kept', () => {
  assert.equal(scrubUrl('https://nexthireconsulting.com/pricing/?email=a@b.com&utm_source=x#plans'),
    'https://nexthireconsulting.com/pricing/')
  assert.equal(scrubUrl('/blog/post/'), '/blog/post/')
  assert.equal(scrubUrl(''), '')
  assert.equal(scrubUrl(null), null)
})

test('every address property is scrubbed, other properties are not', () => {
  const event = {
    properties: {
      $current_url: 'https://nexthireconsulting.com/?ref=mail&email=a@b.com',
      $referrer: 'https://www.google.com/search?q=nexthire',
      $pathname: '/pricing/',
      utm_source: 'newsletter',
      cta_text: 'Try for free',
    },
    $set_once: { $initial_current_url: 'https://nexthireconsulting.com/?token=t' },
  }
  const out = scrubEvent(event)
  assert.equal(out, event)
  assert.equal(out.properties.$current_url, 'https://nexthireconsulting.com/')
  assert.equal(out.properties.$referrer, 'https://www.google.com/search')
  assert.equal(out.properties.$pathname, '/pricing/')
  assert.equal(out.properties.utm_source, 'newsletter')
  assert.equal(out.properties.cta_text, 'Try for free')
  assert.equal(out.$set_once.$initial_current_url, 'https://nexthireconsulting.com/')
  assert.equal(scrubEvent(null), null)
})

test('an app token page carried in the shared cookie is cut to its first segment', () => {
  assert.equal(scrubUrl('https://app.nexthireconsulting.com/join/SECRET-TOKEN?x=1'), 'https://app.nexthireconsulting.com/join')
  assert.equal(scrubUrl('/invite/abc/accept'), '/invite')
  assert.equal(scrubUrl('/joinus/'), '/joinus/')
})

test('heatmap clicks are regrouped under scrubbed page addresses, nested addresses are scrubbed', () => {
  const event = {
    properties: {
      $heatmap_data: {
        'https://nexthireconsulting.com/?email=a@b.com': [{ x: 1 }],
        'https://nexthireconsulting.com/?utm_source=x': [{ x: 2 }],
      },
      $web_vitals_LCP_event: { name: 'LCP', value: 900, $current_url: 'https://nexthireconsulting.com/?email=a@b.com' },
    },
  }
  scrubEvent(event)
  assert.deepEqual(event.properties.$heatmap_data, { 'https://nexthireconsulting.com/': [{ x: 1 }, { x: 2 }] })
  assert.equal(event.properties.$web_vitals_LCP_event.$current_url, 'https://nexthireconsulting.com/')
  assert.ok(!JSON.stringify(event).includes('a@b.com'))
})

test('the first page address sent for feature flags is scrubbed, nothing else is sent', () => {
  assert.deepEqual(scrubbedUrlProps({
    $initial_current_url: 'https://nexthireconsulting.com/?email=a@b.com',
    $initial_referrer: '$direct',
    $initial_utm_source: 'newsletter',
  }), {
    $initial_current_url: 'https://nexthireconsulting.com/',
    $initial_referrer: '$direct',
  })
  assert.deepEqual(scrubbedUrlProps(undefined), {})
})

test('a link into the app is a CTA click, with its text, page and destination', () => {
  assert.deepEqual(
    appLinkClick('https://app.nexthireconsulting.com/auto-apply?utm_source=site', '  Try   Auto Apply\n free ', '/pricing/'),
    { cta_text: 'Try Auto Apply free', page: '/pricing/', destination: '/auto-apply' },
  )
  assert.equal(appLinkClick('https://nexthireconsulting.com/blog/', 'Blog', '/'), null)
  assert.equal(appLinkClick('https://cal.com/nexthire/30min', 'Book', '/'), null)
  assert.equal(appLinkClick('#', 'Book a demo', '/'), null)
})
