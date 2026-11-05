/**
 * One-off import: publishes the inaugural founder blog post to Sanity.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=xxx node scripts/import-founder-post.mjs
 *
 * Idempotent: uses deterministic _ids + createOrReplace, so re-running updates
 * the same documents. Image assets are de-duplicated by Sanity on content hash.
 */
import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN env var.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '5lcdhip2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const IMG_DIR = '/Users/shubham/Documents/Nexthire/NextHire LinkedIn Carousel-png'

/* ── Portable Text helpers ──────────────────────────────────────── */
const k = () => randomUUID().slice(0, 10)

// parts: string | Array<{ text, marks?: string[], link?: string }>
function para(style, parts, listItem) {
  const arr = typeof parts === 'string' ? [{ text: parts }] : parts
  const markDefs = []
  const children = arr.map((p) => {
    const marks = [...(p.marks ?? [])]
    if (p.link) {
      const key = k()
      markDefs.push({ _key: key, _type: 'link', href: p.link })
      marks.push(key)
    }
    return { _type: 'span', _key: k(), text: p.text, marks }
  })
  const block = { _type: 'block', _key: k(), style, markDefs, children }
  if (listItem) {
    block.listItem = listItem
    block.level = 1
  }
  return block
}

const h2 = (t) => para('h2', t)
const h3 = (t) => para('h3', t)
const p = (parts) => para('normal', parts)
const quote = (t) => para('blockquote', t)
const li = (parts) => para('normal', parts, 'bullet')

// A bulleted feature: bold name + rest
const feat = (name, rest) => li([{ text: name, marks: ['strong'] }, { text: rest }])

/* ── Image upload ───────────────────────────────────────────────── */
async function uploadImage(filename, alt, caption) {
  const path = `${IMG_DIR}/${filename}`
  const asset = await client.assets.upload('image', readFileSync(path), {
    filename: basename(path),
  })
  const img = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
  if (alt) img.alt = alt
  if (caption) img.caption = caption
  return img
}

async function main() {
  console.log('Uploading hero image…')
  const hero = await uploadImage(
    '01 Cover.png',
    'NextHire — your whole job search in one app. Seven tools that take you from a blank resume to the interview chair.',
  )

  console.log('Uploading carousel slides…')
  const slideDefs = [
    ['02 Resume Builder.png',     'NextHire Resume Builder — a resume that looks the part, in minutes.',        'Resume Builder'],
    ['03 Profile Optimizer.png',  'NextHire Profile Optimizer — get found on LinkedIn and Naukri.',            'Profile Optimizer'],
    ['04 Job Tracker.png',        'NextHire Job Tracker — every application on one board.',                    'Job Tracker'],
    ['05 Cover Letter.png',       'NextHire Cover Letter Generator — a cover letter written for this job.',    'Cover Letter'],
    ['06 Auto Apply.png',         'NextHire Auto Apply — press apply and we fill in the form.',                'Auto Apply'],
    ['07 AI Interview Coach.png', 'NextHire AI Interview Coach — a coach beside you in every interview.',       'AI Interview Coach'],
    ['08 AI Outreach Agent.png',  'NextHire AI Outreach Agent — reach the recruiter, not the pile.',           'AI Outreach Agent'],
  ]
  const carouselImages = []
  for (const [file, alt, caption] of slideDefs) {
    const img = await uploadImage(file, alt, caption)
    carouselImages.push({ ...img, _key: k() })
    console.log(`  ✓ ${caption}`)
  }

  console.log('Upserting author…')
  const authorId = 'author-shubham-saurabh'
  await client.createOrReplace({
    _id: authorId,
    _type: 'author',
    name: 'Shubham Saurabh',
    slug: { _type: 'slug', current: 'shubham-saurabh' },
    role: 'Co-founder, NextHire',
    bio: 'Co-founder of NextHire. Shubham and his co-founder Hemant Kumar started NextHire after years of running a recruitment agency, to build the AI career agent they wished their friends had.',
  })

  /* ── Body ─────────────────────────────────────────────────────── */
  const SITE = 'https://www.nexthireconsulting.com'
  const APP = 'https://app.nexthireconsulting.com'

  const body = [
    h2('A walk outside Hemant’s house'),
    p('Some of the best ideas don’t arrive in boardrooms. Ours arrived on a walk.'),
    p('It was 2024. My co-founder Hemant Kumar and I were walking outside his house, talking about where the world was heading. The AI wave was in full swing. Every week brought a new model, a new tool, and a new headline about some industry changing forever. We were running a recruitment agency back then, so one question kept coming back to us:'),
    quote('If everything about work is changing, why is looking for work still so painful?'),
    p('We didn’t have to look far for the answer. It was sitting on our phones.'),

    h2('The messages we kept getting'),
    p('Most of our friends were in high-pressure corporate jobs, with long hours, back-to-back calls, and weekends that weren’t really weekends. Many of them wanted to move on to a better role, team, or salary. But wanting to switch jobs and having the time to do it are very different things.'),
    p('So they came to us. “Do you know any openings?” “Can you connect me with a recruiter?” “I applied there three weeks ago and heard nothing. Can you find out what happened?”'),
    p('These were talented people. Their ability was never the problem. The problem was that job hunting had quietly become a second full-time job. They filled in the same details on portal after portal, sent connection requests to recruiters one by one, and followed up on applications that seemed to disappear.'),
    p('That evening, Hemant and I landed on a simple idea. What people really want is a personal Jarvis. You hand it your resume and say, “Find me a job.” It applies on your behalf, reaches out to recruiters, replies and follows up, and then helps you prepare for the interviews it lands you. You just show up.'),
    p('The idea wouldn’t leave us alone, so we built it. That’s NextHire.'),

    h2('What NextHire does today'),
    p('We recently launched, starting with Auto Apply and the AI Interview Coach. Today every piece of the platform is live:'),
    feat('Resume Builder', ' (free, no login needed): build a clean, professional resume in minutes.'),
    feat('Profile Optimisation', ': a browser extension that analyses and optimises your Naukri and LinkedIn profiles.'),
    feat('Job Tracker', ' (free): track the jobs you apply to manually and the ones Auto Apply submits for you, in one place.'),
    feat('Cover Letter', ' (free): generate a tailored cover letter for any job.'),
    feat('Auto Apply', ': applies to relevant jobs on your behalf, so you stop retyping the same details into every form.'),
    feat('AI Outreach Agent', ': pick a company, see the people who work there, and send cold emails to recruiters from your own account.'),
    feat('AI Interview Coach', ': helps you prepare, and supports you during the interview itself.'),
    {
      _type: 'carousel',
      _key: k(),
      caption: 'Swipe through the seven tools inside NextHire.',
      images: carouselImages,
    },
    p('I’ve always loved reading about how technology changes the way people work and search for work. So before we go further, I want to look back honestly at what we believed in 2024 and how much of it held up.'),

    h2('What we got right'),
    h3('People are tired of applying manually'),
    p('This was our core bet, and it held. Applying to jobs is repetitive in a way that drains people. You type the same name, experience, education, and “why do you want to work here” into one form after another.'),
    p('The proof came quickly. Auto Apply became our most-used feature almost immediately. Once people stopped having to fill in the same data again and again, they didn’t want to go back. The hassle wasn’t a minor annoyance. It was the main reason many people applied to far fewer jobs than they should have.'),
    h3('Reaching recruiters one by one doesn’t scale'),
    p('We believed that connecting with every recruiter on LinkedIn, and then chasing them for updates, was one of the biggest drains in the process. It still is. People want the visibility that comes from talking to a real person, but they don’t have hours every week to spend on it.'),
    h3('ATS filters aren’t the gatekeepers people think they are'),
    p('This one played out more clearly than even we expected. Applicant tracking systems are meant to surface the best candidates, but in practice they’re not very good at it. Strong people get filtered out for reasons that have little to do with whether they can do the job.'),
    p('That’s why cold outreach still works. A well-written email that puts you in front of the recruiter for a specific opening gives you a much better chance than waiting for an algorithm to notice you.'),

    h2('The numbers so far'),
    p('We’re early, but here’s where things stand:'),
    li([{ text: '2,000+ resumes built in less than 10 days of launch' }]),
    li([{ text: '24,000+ applications submitted on behalf of our users' }]),
    li([{ text: '2,000+ interviews landed' }]),
    p('That last number matters most to us. Applications are a means. Interviews are the point.'),

    h2('One prediction that hasn’t come true (yet)'),
    p('We expected recruiters to be flooded with AI-generated applications by now. That hasn’t fully happened. It may well become the future, and we’re already thinking about how to keep quality high on both sides of the table when it does. That’s a chapter for a later post.'),

    h2('What we got wrong'),
    h3('People don’t want to drop a resume and walk away'),
    p('Our original vision was pure Jarvis: upload your resume, walk away, and come back to interviews. We assumed that’s what everyone wanted.'),
    p('We were wrong. When it comes to their careers, people want to be involved. They want to see which jobs they’re applying to, which recruiters are being contacted, and what’s being said in their name. They want visibility and control, not a black box.'),
    p('So we changed how we build. Automation does the heavy lifting, but you stay in the driver’s seat. With the Outreach Agent, emails go out from your own account, and you approve them one by one or in bulk. The Job Tracker shows you everything Auto Apply has done. The goal isn’t to replace you in your own job search. It’s to give you back your hours.'),
    h3('Our first outreach feature was a hassle'),
    p('Our first version of recruiter outreach worked like this: you pasted a recruiter’s LinkedIn ID, and we helped you email them. It made sense on a whiteboard. In real life, you still had to find the right recruiter yourself, which was the very hassle we were trying to remove.'),
    p('So we rebuilt it. Now you select a company, see the people who work there, and connect with them directly. One change in the flow turned a feature people tolerated into one they actually use.'),
    h3('We underestimated Naukri and overestimated trust in AI'),
    p('We expected LinkedIn optimisation to lead the way. Instead, people were much keener to optimise their Naukri profiles, which says a lot about where job searches actually happen for many professionals in India.'),
    p('We also learned that people don’t automatically trust AI suggestions, especially about something as personal as how they present themselves. Early on, many users hesitated to accept the changes our tool recommended. What turned it around wasn’t a better pitch from us. It was word of mouth. Once friends started telling friends that the suggestions worked, adoption followed.'),

    h2('Why we built the Interview Coach'),
    p('In our recruitment days, we saw something again and again: people who were great at their work lost opportunities because they couldn’t explain themselves in the interview room. Some froze under pressure. Others simply didn’t know how to put their experience into words.'),
    p('The AI Interview Coach exists to close that gap. It helps you prepare, and during the interview it helps you articulate what you already know: your own experience, your own projects, and what’s already on your resume. It doesn’t invent skills you don’t have. It helps the real you come through.'),

    h2('The story that reminds us why we do this'),
    p('One of our users is a mother of two from Odisha. She had stepped away from her career to raise her children, and when she was ready to return, the job market had little patience for her career break.'),
    p('She applied, and applied, and applied, but applications alone weren’t working. The break kept getting her filtered out before anyone looked past it.'),
    p('So she started using our Outreach Agent. It took a lot of cold emails, but eventually one reached the right person, who looked beyond the gap at what she could actually do. She’s back at work today.'),
    p('Hers is exactly the kind of story we had in mind on that walk in 2024. She didn’t lack talent. The system just wasn’t built to see her. Sometimes all it takes is getting in front of the right person.'),

    h2('Where we go from here'),
    p('AI is changing how hiring works, whether job seekers are ready or not. Recruiters are adopting new tools, and companies are moving faster. Candidates who adapt will have a real edge: they apply smarter and faster, reach out directly, and walk into interviews prepared. Those who stick to the old way risk being left behind.'),
    p('We don’t think that’s a reason to fear AI. We think it’s a reason to put it to work for you.'),
    p('This is the first of many posts. The team will keep sharing what we learn as we build the future of job seeking: what works, what doesn’t, and what surprises us.'),
    p([
      { text: 'If you’re looking for your next role, or know someone who is, start at ' },
      { text: 'nexthireconsulting.com', link: SITE },
      { text: '. Or go straight to ' },
      { text: 'app.nexthireconsulting.com', link: APP },
      { text: ' to build your resume for free and try Auto Apply on your next job.' },
    ]),
    p([{ text: 'Your Jarvis is ready. Time to show up.', marks: ['strong'] }]),
    p([{ text: '— Shubham Saurabh, Co-founder, NextHire', marks: ['em'] }]),
  ]

  /* ── Post document ────────────────────────────────────────────── */
  const slug = 'what-we-got-right-and-wrong-about-the-future-of-job-seeking'
  const postId = 'post-founder-right-wrong-job-seeking'

  console.log('Creating post…')
  await client.createOrReplace({
    _id: postId,
    _type: 'post',
    title: 'What We Got Right and Wrong About the Future of Job Seeking',
    slug: { _type: 'slug', current: slug },
    category: 'INSIGHTS',
    publishedAt: '2026-11-05T09:00:00.000Z',
    author: 'Shubham Saurabh',
    authorRef: { _type: 'reference', _ref: authorId },
    readTime: '7 min read',
    heroImage: hero,
    excerpt:
      'The inaugural NextHire post. Co-founder Shubham Saurabh on the 2024 walk that became NextHire — what we got right about the future of job seeking, what we got wrong, and what we’re building next.',
    tldr:
      'In 2024, two recruiters on a walk asked why looking for work is still so painful. This is the honest story of what we bet on building NextHire: what held up, what we got wrong, and where we go next.',
    body,
    keyTakeaways: [
      'People were tired of applying manually — Auto Apply became our most-used feature almost immediately.',
      'Candidates want visibility and control, not a black box. Automation should give you your hours back, not take over your search.',
      'In India, Naukri optimisation mattered more than LinkedIn, and trust in AI suggestions grew through word of mouth, not our pitch.',
      'Early results: 2,000+ resumes built in 10 days, 24,000+ applications submitted, and 2,000+ interviews landed.',
    ],
    metaTitle: 'What We Got Right and Wrong About the Future of Job Seeking',
    metaDescription:
      'NextHire co-founder Shubham Saurabh on the 2024 walk that started it all — what we bet on, what we got wrong, and the tools now live for job seekers.',
    noindex: false,
  })

  console.log('\nDone.')
  console.log(`Post URL: ${SITE}/blog/${slug}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
