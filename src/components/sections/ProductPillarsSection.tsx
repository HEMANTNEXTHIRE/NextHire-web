'use client'

/* ── Pillar copy ────────────────────────────────────────────────
   Three smaller cards. The big card (Pre-posting access) is hard-
   coded in the JSX so the visual can occupy a different layout. */
const PILLARS = [
  {
    id: 'velocity',
    eyebrow: '02 · Application velocity',
    title: 'Apply before the queue closes',
    body: 'Recruiters review the first 25 applicants within 48 hours. After that, your résumé sits unread. NextHire submits tailored, ATS-optimized applications the moment a role goes live, so you stay at the top of the stack.',
  },
  {
    id: 'mastery',
    eyebrow: '03 · Interview mastery',
    title: 'Walk in prepared, every round',
    body: 'Most rejections come from questions you could have rehearsed. Our AI coach runs full mocks tuned to your target role and gives line-by-line feedback after every answer so each round is sharper than the last.',
  },
  {
    id: 'pipeline',
    eyebrow: '04 · Recruiter pipeline',
    title: 'Skip the queue entirely',
    body: 'Companies pay our talent partners to source profiles like yours. Once you\'re in the network, recruiters reach out directly with intro calls instead of application forms and waiting lists.',
  },
]

/* ── Visual: hidden roles list (big card) ───────────────────── */
function PrePostingVisual() {
  const ROLES = [
    { logo: 'F', color: '#5fa89e', bg: 'rgba(95,168,158,0.12)', co: 'Series B fintech',   role: 'VP, Engineering',  tag: 'Internal pipeline', tagColor: '#2e7d4f', tagBg: 'rgba(46,125,79,0.10)' },
    { logo: 'A', color: '#2e7d4f', bg: 'rgba(46,125,79,0.12)',  co: 'AI infra startup',   role: 'Sr ML Engineer',   tag: 'Posting in 7d',     tagColor: '#1d6fb8', tagBg: 'rgba(29,111,184,0.10)' },
    { logo: 'D', color: '#3d7a72', bg: 'rgba(61,122,114,0.12)', co: 'Dev tools platform', role: 'Staff Frontend',   tag: 'Pre-listing',       tagColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.10)' },
    { logo: 'S', color: '#166534', bg: 'rgba(22,101,52,0.12)',  co: 'B2B SaaS leader',    role: 'Product Designer', tag: 'Manager open',      tagColor: '#b45309', tagBg: 'rgba(180,83,9,0.10)' },
  ]
  return (
    <div style={{
      padding: '32px 36px 32px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      justifyContent: 'center',
      height: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.20)',
          }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: '#3d7a72', letterSpacing: '1.2px', textTransform: 'uppercase' as const }}>
            Hidden roles · Live now
          </span>
        </div>
        <span style={{ fontSize: 11, color: '#8aada8', fontWeight: 500 }}>AI scanned 50+ sources</span>
      </div>

      {/* Role rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROLES.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 16px',
            background: '#ffffff',
            border: '1.5px solid #c8dfd6',
            borderRadius: 14,
            boxShadow: '0 2px 8px rgba(19,33,40,0.06)',
          }}>
            {/* Logo */}
            <div style={{
              width: 42, height: 42, borderRadius: 11,
              background: r.bg,
              border: `1.5px solid ${r.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, fontWeight: 800, color: r.color,
              flexShrink: 0,
              letterSpacing: 0,
            }}>{r.logo}</div>

            {/* Company + role */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#132128', lineHeight: 1.25, letterSpacing: '-0.2px' }}>{r.co}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, letterSpacing: '-0.1px' }}>{r.role}</div>
            </div>

            {/* Status tag */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: r.tagColor,
              background: r.tagBg,
              padding: '5px 11px', borderRadius: 999,
              whiteSpace: 'nowrap' as const, letterSpacing: '-0.1px',
            }}>{r.tag}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Visual: recruiter queue ────────────────────────────────── */
function VelocityVisual() {
  const ROWS = [
    { you: true,  label: 'You — applied',   time: '12 min ago' },
    { you: false, label: 'Other applicant', time: '8 hours ago' },
    { you: false, label: 'Other applicant', time: '1 day ago' },
    { you: false, label: 'Other applicant', time: '2 days ago' },
  ]
  return (
    <div style={{ padding: '0 24px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#5fa89e', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
          Recruiter queue
        </span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Reviewing now</span>
      </div>

      {/* Queue rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {ROWS.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px',
            background: a.you ? '#132128' : '#ffffff',
            border: a.you ? 'none' : '1.5px solid #c8dfd6',
            borderRadius: 11,
            opacity: a.you ? 1 : 0.7,
            boxShadow: a.you ? '0 4px 14px rgba(19,33,40,0.18)' : 'none',
          }}>
            {/* Rank */}
            <div style={{
              fontSize: 13, fontWeight: 800, letterSpacing: '-0.3px',
              color: a.you ? '#5fa89e' : '#d1d5db',
              minWidth: 24,
            }}>#{i + 1}</div>

            {/* Label */}
            <div style={{ flex: 1, fontSize: 13, fontWeight: a.you ? 700 : 500, color: a.you ? '#ffffff' : '#132128', letterSpacing: '-0.1px' }}>
              {a.label}
            </div>

            {/* Time */}
            <div style={{ fontSize: 11, color: a.you ? 'rgba(255,255,255,0.55)' : '#9ca3af', whiteSpace: 'nowrap' as const }}>
              {a.time}
            </div>

            {/* "First" badge on you */}
            {a.you && (
              <span style={{
                fontSize: 10, fontWeight: 800, color: '#22c55e',
                background: 'rgba(34,197,94,0.15)', borderRadius: 6,
                padding: '3px 8px', whiteSpace: 'nowrap' as const,
              }}>Top</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Visual: AI coach mock ──────────────────────────────────── */
function MasteryVisual() {
  return (
    <div style={{ padding: '0 20px 8px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
        <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.22)' }} />
        <span style={{ fontSize: 11, fontWeight: 800, color: '#5fa89e', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
          AI Coach · Mock round 3
        </span>
      </div>

      {/* AI question bubble */}
      <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9,
          background: '#edf5f1', border: '1.5px solid #c8dfd6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>🤖</div>
        <div style={{
          background: '#ffffff', border: '1.5px solid #c8dfd6',
          borderRadius: '14px 14px 14px 4px',
          padding: '12px 14px',
          fontSize: 13, color: '#132128', lineHeight: 1.5,
          fontWeight: 500, maxWidth: '84%',
          boxShadow: '0 1px 4px rgba(19,33,40,0.06)',
        }}>
          How would you scope an event-driven migration for a 3-person team?
        </div>
      </div>

      {/* User reply bubble */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          background: '#132128', color: '#ffffff',
          borderRadius: '14px 14px 4px 14px',
          padding: '12px 14px',
          fontSize: 13, lineHeight: 1.5,
          maxWidth: '84%',
          boxShadow: '0 2px 8px rgba(19,33,40,0.16)',
        }}>
          Start with the highest-friction service, validate the contract, then…
        </div>
      </div>

      {/* Feedback chip */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 9,
        background: 'rgba(95,168,158,0.12)',
        border: '1.5px solid rgba(95,168,158,0.28)',
        borderRadius: 11, padding: '10px 13px',
      }}>
        <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>✦</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#3d7a72', marginBottom: 2 }}>Coach feedback</div>
          <div style={{ fontSize: 12, color: '#3d7a72', lineHeight: 1.5 }}>
            Strong scoping. Add a rollback strategy on next pass.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Visual: inbound recruiter messages ─────────────────────── */
function PipelineVisual() {
  const MESSAGES = [
    { initial: 'S', name: 'Sarah',  role: 'Talent Partner',  subject: 'Quick intro for Senior Eng?',  time: '2h', color: '#2e7d4f', bg: 'rgba(46,125,79,0.12)' },
    { initial: 'D', name: 'David',  role: 'In-house TA',     subject: "Staff role I think you'd fit",  time: '1d', color: '#3d7a72', bg: 'rgba(61,122,114,0.12)' },
    { initial: 'M', name: 'Maya',   role: 'Recruiter',       subject: 'Coffee chat with our CTO?',    time: '3d', color: '#166534', bg: 'rgba(22,101,52,0.12)' },
  ]
  return (
    <div style={{ padding: '0 24px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#5fa89e', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
          Inbound this week
        </span>
        <span style={{
          fontSize: 10, fontWeight: 700, color: '#22c55e',
          background: 'rgba(34,197,94,0.12)', borderRadius: 6, padding: '2px 8px',
        }}>3 new</span>
      </div>

      {/* Message rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MESSAGES.map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'center',
            padding: '12px 14px',
            background: '#ffffff',
            border: '1.5px solid #c8dfd6',
            borderRadius: 13,
            boxShadow: '0 1px 6px rgba(19,33,40,0.05)',
          }}>
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: m.bg, border: `1.5px solid ${m.color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: m.color,
              flexShrink: 0,
            }}>{m.initial}</div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#132128', letterSpacing: '-0.1px' }}>{m.name}</span>
                <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 400 }}>· {m.role}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                {m.subject}
              </div>
            </div>

            {/* Time */}
            <div style={{ fontSize: 11, color: '#c0cdd6', flexShrink: 0 }}>{m.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
export default function ProductPillarsSection() {
  return (
    <section style={{ background: '#ffffff', padding: 'clamp(56px, 8vw, 96px) 0' }}>
      <style>{`
        .nh-pillars-big {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
          gap: 0;
          min-height: 360px;
          background: #edf5f1;
          border-radius: 21px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .nh-pillars-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .nh-pillars-big { grid-template-columns: 1fr; }
          .nh-pillars-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .nh-pillars-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="nh-container">
        {/* Heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, color: '#3d7a72',
            background: 'rgba(95,168,158,0.10)',
            padding: '5px 16px', borderRadius: 100,
            letterSpacing: '1.2px', textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            How it works
          </div>
          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500,
            color: '#132128', margin: '0 0 16px',
            letterSpacing: '-1.1px', lineHeight: 1.15,
          }}>
            <span style={{ display: 'block' }}>How NextHire wins</span>
            <span style={{ display: 'block' }}>you the role</span>
          </h2>
          <p style={{
            fontSize: 18, color: '#4b5563', margin: 0,
            lineHeight: 1.55, letterSpacing: '-0.2px',
          }}>
            Manual job hunting can&apos;t compete with internal pipelines, application speed, or rehearsed interviews. NextHire automates all three so you stop missing roles and start getting offers.
          </p>
        </div>

        {/* Big card — Pre-posting access */}
        <div className="nh-pillars-big">
          <div style={{
            padding: '48px 32px 48px 48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 800, color: '#5fa89e',
              letterSpacing: '1.5px', textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              01 · Pre-posting access
            </div>
            <h3 style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 500,
              color: '#132128', margin: '0 0 14px',
              letterSpacing: '-0.8px', lineHeight: 1.2,
            }}>
              Reach hiring managers before the listing goes public
            </h3>
            <p style={{
              fontSize: 16, color: '#4b5563', margin: 0,
              lineHeight: 1.55, letterSpacing: '-0.2px',
            }}>
              Most senior roles are filled through referrals or internal pipelines before they&apos;re publicly listed. Our AI monitors hiring signals across LinkedIn, company sites, and engineering hubs so your profile reaches decision-makers while the role is still being scoped.
            </p>
          </div>
          <PrePostingVisual />
        </div>

        {/* Three small cards */}
        <div className="nh-pillars-row">
          {PILLARS.map((p) => (
            <div key={p.id} style={{
              background: '#edf5f1',
              borderRadius: 21,
              minHeight: 460,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              padding: '32px 0 32px',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '0 32px' }}>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: '#5fa89e',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  marginBottom: 14,
                }}>
                  {p.eyebrow}
                </div>
                <h3 style={{
                  fontFamily: "'Droid Serif', Georgia, serif",
                  fontSize: 22, fontWeight: 500,
                  color: '#132128', margin: '0 0 12px',
                  letterSpacing: '-0.5px', lineHeight: 1.25,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: 14, color: '#4b5563', margin: 0,
                  lineHeight: 1.55, letterSpacing: '-0.1px',
                }}>
                  {p.body}
                </p>
              </div>
              <div style={{ marginTop: 24 }}>
                {p.id === 'velocity' && <VelocityVisual />}
                {p.id === 'mastery' && <MasteryVisual />}
                {p.id === 'pipeline' && <PipelineVisual />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
