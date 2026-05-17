/**
 * Programmatic SEO data for /interview-questions/[role].
 *
 * Each role becomes one statically-generated page at build time. To add
 * new roles, append entries here — no other code changes required.
 *
 * SEO target: long-tail queries of the form
 *   "<role> interview questions"
 *   "common <role> interview questions and answers"
 *   "<role> interview prep"
 */

export interface InterviewQuestion {
  question: string
  answer: string
  /** Optional category tag shown above the question (e.g., "Behavioral", "System Design"). */
  tag?: string
}

export interface InterviewRole {
  /** URL slug, e.g. "software-engineer". */
  slug: string
  /** Display title, e.g. "Software Engineer". */
  title: string
  /** One-paragraph intro that anchors the page for both readers and search engines. */
  intro: string
  /** Skills, traits, or signals an interviewer is looking for. Rendered as a bullet list. */
  whatInterviewersLookFor: string[]
  /** 8-15 question/answer pairs. */
  questions: InterviewQuestion[]
  /** Closing prep advice paragraph. */
  prepTip: string
  /** Meta description override; falls back to intro. */
  metaDescription?: string
  /** Optional last-updated date (ISO). */
  dateModified?: string
}

export const interviewRoles: InterviewRole[] = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    intro:
      'Software engineering interviews in 2026 still lean heavily on data structures, system design, and behavioral signal — but the bar has shifted. Interviewers expect candidates to reason about AI-assisted workflows, distributed systems, and trade-offs under real production constraints, not just textbook algorithms.',
    whatInterviewersLookFor: [
      'Clear problem decomposition before writing code',
      'Time- and space-complexity reasoning, not just "it works"',
      'Awareness of edge cases, failure modes, and observability',
      'Communication: thinking out loud and asking clarifying questions',
      'Pragmatic judgment on when to use AI tooling vs. write it yourself',
    ],
    questions: [
      {
        tag: 'Behavioral',
        question: 'Tell me about a time you shipped something difficult.',
        answer:
          'Use STAR (Situation, Task, Action, Result). Pick a project with measurable impact, name your specific contribution, and quantify the result. Strong answers also include what you would do differently — interviewers reward honest reflection.',
      },
      {
        tag: 'Coding',
        question: 'Reverse a linked list in place.',
        answer:
          'Iterative three-pointer (prev, curr, next) in O(n) time, O(1) space. Walk through the pointer dance verbally before coding. Many candidates lose points by jumping straight to syntax; the interviewer wants to see your reasoning.',
      },
      {
        tag: 'System Design',
        question: 'Design a URL shortener that handles 100M URLs.',
        answer:
          'Cover: base-62 encoding for short codes, a key-value store (Redis or DynamoDB) for the lookup hot path, a relational store for analytics, and a CDN edge for the redirect. Discuss read/write ratio (heavily read-dominant), cache strategy, and how you would prevent collisions.',
      },
      {
        tag: 'System Design',
        question: 'How would you scale a service from 1K to 1M requests/sec?',
        answer:
          'Walk through stages: vertical scaling first, then horizontal with a load balancer, then introduce caching (CDN, application cache, DB cache), then partition the database, then move hot paths to async queues. Name a real bottleneck at each stage — that signals you have done this before.',
      },
      {
        tag: 'Behavioral',
        question: 'Tell me about a disagreement with a teammate and how you resolved it.',
        answer:
          'Show emotional regulation and an outcome focused on the work, not on winning. Strong answers cite the technical or business reasoning that resolved it, and what changed in how you collaborate afterwards.',
      },
      {
        tag: 'Coding',
        question: 'Find the kth largest element in an unsorted array.',
        answer:
          'Three valid approaches: sort (O(n log n)), min-heap of size k (O(n log k)), or QuickSelect (O(n) average). State each, pick QuickSelect, and explain why the partition step works. Watch for off-by-one when k equals the array length.',
      },
      {
        tag: 'Trade-offs',
        question: 'When would you use SQL vs. NoSQL?',
        answer:
          'SQL for relational integrity, complex joins, and transactional guarantees. NoSQL for high write throughput, flexible schema, and horizontal scaling. The honest answer: most production systems use both. Cite a concrete example from your experience.',
      },
      {
        tag: 'Behavioral',
        question: 'How do you stay current with new technology?',
        answer:
          'Specifics beat generalities. Name a newsletter, a podcast, an OSS project you contribute to, or a recent paper you read. Tie it to something you built recently — the interviewer is checking that learning translates to action.',
      },
    ],
    prepTip:
      'For the week before: do two timed mock interviews, refresh the basics of one system-design pattern per day (caching, queuing, sharding, replication, CAP trade-offs), and prepare three behavioral stories that each cover multiple traits. Do not cram new algorithms the night before — sleep matters more.',
    metaDescription:
      'Software engineer interview questions in 2026: 8 real questions with model answers, what interviewers look for, and a focused prep plan.',
    dateModified: '2026-05-15T00:00:00.000Z',
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    intro:
      'PM interviews test five things in roughly equal measure: product sense, analytical reasoning, strategy, execution, and communication. The candidates who advance are the ones who structure their thinking out loud — not the ones who happen to have the right answer.',
    whatInterviewersLookFor: [
      'A clear framework for ambiguous questions (do not freelance)',
      'Customer obsession backed by specific examples',
      'Comfort with data, metrics, and trade-offs',
      'Strong opinions held loosely — pushback handled gracefully',
      'Cross-functional storytelling: how you led without authority',
    ],
    questions: [
      {
        tag: 'Product Sense',
        question: 'How would you improve Google Maps?',
        answer:
          'Start by clarifying the goal (engagement, monetization, retention?), pick a user segment, identify their unmet need, brainstorm 3-5 ideas, and prioritize by impact-vs-effort. Pick one and walk through how you would measure success.',
      },
      {
        tag: 'Analytical',
        question: 'A core metric dropped 15% overnight. Walk me through how you investigate.',
        answer:
          'Segment the drop (geography, platform, user cohort, time of day) before forming a hypothesis. Distinguish data issue vs. real change. Check recent releases and external events. Communicate timeline and severity to stakeholders while the investigation is in flight.',
      },
      {
        tag: 'Strategy',
        question: 'Should we build, buy, or partner for this capability?',
        answer:
          'Strategic fit, time-to-market, cost, and switching risk are the four axes. Build when it is core to differentiation; buy when speed matters more than fit; partner when you need validation before committing capital. Always name your dealbreakers.',
      },
      {
        tag: 'Estimation',
        question: 'Estimate the number of Uber rides in San Francisco per day.',
        answer:
          'Bottom-up: population × Uber-using share × rides per user per day. Top-down: total trips in city × Uber market share. Compare both for sanity. The interviewer cares about the method, not the number — show your assumptions.',
      },
      {
        tag: 'Execution',
        question: 'How do you prioritize when engineering capacity is constrained?',
        answer:
          'A scoring framework (RICE, ICE, or similar) plus stakeholder transparency. Name how you handle pet projects from execs and how you say no without burning the relationship. Cite a real trade-off you made.',
      },
      {
        tag: 'Behavioral',
        question: 'Tell me about a product that failed and what you learned.',
        answer:
          'Pick a real failure. Be specific about what you assumed, what was wrong about it, and what changed in your process afterwards. Avoid blaming the team or the market — the interviewer is looking for ownership.',
      },
      {
        tag: 'Communication',
        question: 'How do you handle a senior stakeholder pushing back on your roadmap?',
        answer:
          'Surface the underlying concern, propose a data-gathering step instead of immediately conceding or doubling down, and align on shared success metrics. Conflict resolution > conflict avoidance.',
      },
    ],
    prepTip:
      'Practice with a peer who will interrupt and challenge you — that simulates the real PM loop better than answering questions to yourself in the mirror. Have three rehearsed-but-flexible stories ready, and read the company\'s latest product launches before the day.',
    metaDescription:
      'Product manager interview questions in 2026: product sense, analytical, strategy, and execution prompts with model answers and a focused prep plan.',
    dateModified: '2026-05-15T00:00:00.000Z',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    intro:
      'Data science interviews in 2026 are noticeably more applied than they were five years ago. SQL fluency and product sense are now table stakes; the differentiator is whether you can ship a model that actually moves a business metric, and explain why.',
    whatInterviewersLookFor: [
      'SQL fluency on real-world schemas, not toy tables',
      'Statistical reasoning, especially around causality vs. correlation',
      'Knowing when ML is the wrong tool',
      'Communicating model output to non-technical stakeholders',
      'Awareness of data quality, bias, and ethical risks',
    ],
    questions: [
      {
        tag: 'SQL',
        question: 'Write a query to find the top 3 products by revenue each month.',
        answer:
          'Window function with ROW_NUMBER() OVER (PARTITION BY month ORDER BY revenue DESC), then filter where rn ≤ 3. Mention that DENSE_RANK changes the answer when there are ties — interviewers love when you flag this unprompted.',
      },
      {
        tag: 'Statistics',
        question: 'How would you design an A/B test for a new homepage?',
        answer:
          'Define the metric, compute required sample size (effect size × baseline conversion × power), randomize at the user level, run for at least one full business cycle, and check for novelty effects. Cover guardrail metrics, not just the primary one.',
      },
      {
        tag: 'ML',
        question: 'When would you choose a simple model over a complex one?',
        answer:
          'When interpretability matters (regulated industries), when training data is limited, when latency or cost is constrained, or when the simple model is within 1-2% of the complex one. "Always start with the simplest thing that works" is the right framing.',
      },
      {
        tag: 'Product',
        question: 'How would you measure the success of a recommendation system?',
        answer:
          'Multi-layer: offline metrics (precision@k, recall), online metrics (CTR, dwell time, downstream revenue), and qualitative diversity / fairness audits. Name the trade-off: optimizing CTR can collapse diversity over time.',
      },
      {
        tag: 'Behavioral',
        question: 'Describe a model that did not perform in production and what you did.',
        answer:
          'Distribution shift, training/serving skew, feedback loops — pick one. Be specific about how you detected it, what you changed, and what monitoring you added so it would not happen again.',
      },
      {
        tag: 'Causal Inference',
        question: 'How do you know if a feature causes a metric change or just correlates?',
        answer:
          'Randomized experiment is the gold standard. If that is impossible, use difference-in-differences, regression discontinuity, or instrumental variables — whichever fits the natural experiment in the data. Acknowledge what each assumes.',
      },
    ],
    prepTip:
      'Spend a third of your prep on SQL drills, a third on stats fundamentals, and a third on the company\'s actual product — interviewers reward candidates who already understand the business. Bring two real projects you can talk about deeply.',
    metaDescription:
      'Data scientist interview questions in 2026: SQL, statistics, ML, and product prompts with model answers. Real questions, real prep.',
    dateModified: '2026-05-15T00:00:00.000Z',
  },
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    intro:
      'Frontend interviews in 2026 cover the same ground they always have — HTML, CSS, JavaScript, React, performance — but the bar for accessibility, web vitals, and reasoning about hydration and edge rendering has gone up sharply. Junior-passing answers from 2022 will not land a senior offer today.',
    whatInterviewersLookFor: [
      'Deep JavaScript fundamentals (closures, async, prototypes)',
      'Practical CSS: flexbox, grid, modern layout, container queries',
      'React internals: reconciliation, memo, suspense, server components',
      'Performance: Core Web Vitals, bundle analysis, rendering strategies',
      'Accessibility as a first-class concern, not an afterthought',
    ],
    questions: [
      {
        tag: 'JavaScript',
        question: 'Explain the event loop, microtasks, and macrotasks.',
        answer:
          'Synchronous code runs first. Then the microtask queue drains completely (promises, queueMicrotask), then one macrotask runs (setTimeout, I/O). Repeat. This is why a Promise.resolve().then() runs before a setTimeout(_, 0).',
      },
      {
        tag: 'React',
        question: 'What is the difference between useMemo, useCallback, and React.memo?',
        answer:
          'useMemo caches a computed value, useCallback caches a function reference, React.memo skips re-rendering a component when props are referentially equal. Most apps overuse all three — the right default is to not memoize, and add it when you have measured a problem.',
      },
      {
        tag: 'CSS',
        question: 'Center a div horizontally and vertically — give three ways.',
        answer:
          'Flexbox (display: flex; place-items: center). Grid (display: grid; place-items: center). Absolute positioning with transform translate(-50%, -50%). The interviewer is checking that you reach for modern layout first.',
      },
      {
        tag: 'Performance',
        question: 'A page has a 6-second LCP. Walk me through how you fix it.',
        answer:
          'Run Lighthouse. Inspect the LCP element. Common causes: large hero image without optimization, render-blocking JS, slow TTFB, late-discovered resources. Fix priority: preload critical resources, defer non-critical JS, optimize images (WebP/AVIF, responsive srcset), and reduce server response time.',
      },
      {
        tag: 'Accessibility',
        question: 'How do you make a custom dropdown accessible?',
        answer:
          'Use semantic HTML where possible (<select> if the design allows). For custom: role="listbox", aria-activedescendant, keyboard handling (arrows, Enter, Esc), focus management, and screen reader testing. Cite the WAI-ARIA Authoring Practices.',
      },
      {
        tag: 'React',
        question: 'What is the difference between server and client components in Next.js?',
        answer:
          'Server components run only on the server, can fetch data directly, and never ship JavaScript to the client. Client components ship JS, can use hooks and browser APIs. The boundary is the "use client" directive. Default to server; opt into client only when you need interactivity.',
      },
    ],
    prepTip:
      'Build something small and modern the week before the interview — a feature with React 19, server components, or a CSS pattern you have not used. Interviewers can tell within 30 seconds whether you have shipped recently. Practice explaining what you built, not just listing tech.',
    metaDescription:
      'Frontend engineer interview questions in 2026: JavaScript, React, CSS, performance, and accessibility prompts with model answers.',
    dateModified: '2026-05-15T00:00:00.000Z',
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    intro:
      'DevOps interviews test breadth across infrastructure, CI/CD, observability, security, and incident response. The candidates who stand out can talk about specific production fires they handled and the systemic changes that came out of those incidents.',
    whatInterviewersLookFor: [
      'Comfort with one cloud provider deeply, more than one shallowly',
      'CI/CD pipeline design with security and rollback in mind',
      'Observability: metrics, logs, traces, and how they tie together',
      'Incident response: detection, mitigation, postmortem culture',
      'Cost awareness — most candidates ignore this',
    ],
    questions: [
      {
        tag: 'Infrastructure',
        question: 'Walk me through how a request flows from a user to your backend.',
        answer:
          'DNS → CDN edge → load balancer → ingress / service mesh → application pod → database. Mention TLS termination, where caching happens, and where you would add observability. Strong answers also flag failure points at each hop.',
      },
      {
        tag: 'CI/CD',
        question: 'How do you safely deploy a change to production?',
        answer:
          'Pipeline gates (tests, security scan, manual approval if needed). Deploy strategy: blue-green, canary, or rolling. Health checks. Auto-rollback on metric regression. Feature flags decouple deploy from release. Discuss what you actually use, not theory.',
      },
      {
        tag: 'Observability',
        question: 'A service is slow but not erroring. How do you debug?',
        answer:
          'Start with the four golden signals: latency, traffic, errors, saturation. Look at p95/p99, not the mean. Trace one slow request end-to-end. Check downstream dependencies (DB, cache, external API). Most production slowness is one of: lock contention, slow query, GC pause, or noisy neighbor.',
      },
      {
        tag: 'Security',
        question: 'How do you manage secrets in production?',
        answer:
          'A secrets manager (AWS Secrets Manager, Vault, GCP Secret Manager). Short-lived credentials via IAM roles or workload identity. No secrets in env files committed to git. Rotation policy. Audit access. Strong answers cite a real near-miss.',
      },
      {
        tag: 'Incident',
        question: 'Tell me about an incident you led and what changed afterwards.',
        answer:
          'Specific incident, your role, the timeline, the customer impact, and — most importantly — the systemic change. Tooling change > process change > "we communicated more". Blameless framing is expected at this point.',
      },
      {
        tag: 'Cost',
        question: 'How would you reduce cloud spend without sacrificing reliability?',
        answer:
          'Reserved capacity for steady workloads, spot/preemptible for fault-tolerant batch, right-size instances based on actual utilization, S3 lifecycle policies, retire orphaned resources. Reliability comes from chaos testing the cheaper config, not from over-provisioning.',
      },
    ],
    prepTip:
      'Have a concrete production story ready that covers detection, diagnosis, mitigation, and post-incident change. Practice drawing system diagrams on a whiteboard — many DevOps interviews are visual and candidates who can sketch fluidly stand out immediately.',
    metaDescription:
      'DevOps engineer interview questions in 2026: infrastructure, CI/CD, observability, security, and incident-response prompts with model answers.',
    dateModified: '2026-05-15T00:00:00.000Z',
  },
]

export function getInterviewRoleBySlug(slug: string): InterviewRole | undefined {
  return interviewRoles.find((r) => r.slug === slug)
}

export function getAllInterviewRoleSlugs(): string[] {
  return interviewRoles.map((r) => r.slug)
}
