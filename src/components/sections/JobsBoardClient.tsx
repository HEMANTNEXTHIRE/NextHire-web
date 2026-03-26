'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FONT_FAMILY, WEIGHT } from '@/constants/typography'
import type { EmploymentType, JobLevel, JobListing } from './jobsMockData'
import { MOCK_JOBS } from './jobsMockData'

const POSTED_OPTIONS = [
  { value: 'all', label: 'All time' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
] as const

const LEVEL_OPTIONS: { value: 'any' | JobLevel; label: string }[] = [
  { value: 'any', label: 'Any level' },
  { value: 'Entry', label: 'Entry' },
  { value: 'Mid', label: 'Mid' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead' },
]

const EMPLOYMENT_OPTIONS: { value: 'any' | EmploymentType; label: string }[] = [
  { value: 'any', label: 'Any type' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Part-time', label: 'Part-time' },
]

function uniqueLocations(jobs: JobListing[]): string[] {
  const set = new Set<string>()
  jobs.forEach((j) => {
    set.add(j.location)
    if (j.remoteFriendly) set.add('Remote')
  })
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function formatPosted(days: number): string {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 7) return `${days} days ago`
  if (days < 14) return '1 week ago'
  return `${Math.floor(days / 7)} weeks ago`
}

function jobMatchesSearch(job: JobListing, q: string): boolean {
  if (!q.trim()) return true
  const needle = q.toLowerCase()
  const hay = [job.title, job.company, job.location, job.snippet, job.description, ...job.skills, ...job.requirements]
    .join(' ')
    .toLowerCase()
  return hay.includes(needle)
}

/* ─────────────────────────────────────────────────────────
   Preview content — shared between desktop panel & bottom sheet
───────────────────────────────────────────────────────── */
function JobPreviewContent({ job }: { job: JobListing }) {
  return (
    <article className="jobs-board-preview" aria-live="polite">
      <header className="jobs-board-preview__head">
        <h2 className="jobs-board-preview__title">{job.title}</h2>
        <p className="jobs-board-preview__meta" style={{ fontFamily: FONT_FAMILY }}>
          <span className="jobs-board-preview__company">{job.company}</span>
          <span className="jobs-board-preview__dot" aria-hidden>·</span>
          <span>{job.location}</span>
          <span className="jobs-board-preview__dot" aria-hidden>·</span>
          <span>{formatPosted(job.postedDaysAgo)}</span>
        </p>
        <div className="jobs-board-preview__badges">
          <span className="jobs-board-pill">{job.employmentType}</span>
          <span className="jobs-board-pill">{job.workType}</span>
          <span className="jobs-board-pill">{job.level}</span>
        </div>
      </header>

      <div className="jobs-board-preview__actions">
        <a href={job.applyUrl} className="jobs-board-btn jobs-board-btn--primary" target="_blank" rel="noopener noreferrer">
          Apply now
        </a>
        <a href={job.careerUrl} className="jobs-board-btn jobs-board-btn--secondary" target="_blank" rel="noopener noreferrer">
          Career site
        </a>
      </div>

      <div className="jobs-board-insights">
        <h3 className="jobs-board-insights__title">At a glance</h3>
        <dl className="jobs-board-insights__grid">
          <div className="jobs-board-insight"><dt>Location</dt><dd>{job.location}</dd></div>
          <div className="jobs-board-insight"><dt>Compensation</dt><dd>{job.salaryDisplay ?? 'Not listed'}</dd></div>
          <div className="jobs-board-insight"><dt>Work style</dt><dd>{job.workType}</dd></div>
          <div className="jobs-board-insight"><dt>Employment</dt><dd>{job.employmentType}</dd></div>
        </dl>
      </div>

      <section className="jobs-board-section">
        <h3 className="jobs-board-section__title">About the role</h3>
        <p className="jobs-board-section__body" style={{ fontFamily: FONT_FAMILY }}>{job.description}</p>
      </section>

      <section className="jobs-board-section">
        <h3 className="jobs-board-section__title">Requirements</h3>
        <ul className="jobs-board-bullets" style={{ fontFamily: FONT_FAMILY }}>
          {job.requirements.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <section className="jobs-board-section">
        <h3 className="jobs-board-section__title">Skills &amp; keywords</h3>
        <div className="jobs-board-skills">
          {job.skills.map((s) => <span key={s} className="jobs-board-skill">{s}</span>)}
        </div>
      </section>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────
   Bottom sheet — mobile job detail drawer
───────────────────────────────────────────────────────── */
function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef(0)
  const [dragY, setDragY] = useState(0)
  const isDragging = useRef(false)

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setDragY(0)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Trap focus back on close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Handle touch on the drag handle only
  const onHandleTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientY
    isDragging.current = true
    setDragY(0)
  }

  const onHandleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const delta = e.touches[0].clientY - dragStart.current
    if (delta > 0) setDragY(delta)
  }

  const onHandleTouchEnd = () => {
    isDragging.current = false
    if (dragY > 72) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  // Also allow dragging on the sheet body when scrolled to top
  const onSheetTouchStart = (e: React.TouchEvent) => {
    const scrollTop = contentRef.current?.scrollTop ?? 0
    if (scrollTop > 4) return
    dragStart.current = e.touches[0].clientY
    isDragging.current = true
    setDragY(0)
  }

  const onSheetTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const scrollTop = contentRef.current?.scrollTop ?? 0
    if (scrollTop > 4) { isDragging.current = false; setDragY(0); return }
    const delta = e.touches[0].clientY - dragStart.current
    if (delta > 0) {
      e.preventDefault()
      setDragY(delta)
    }
  }

  const onSheetTouchEnd = () => {
    isDragging.current = false
    if (dragY > 72) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  const translateY = open ? dragY : '100%'
  const transition = dragY > 0
    ? 'none'
    : 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)'

  return (
    <>
      {/* Backdrop */}
      <div
        className={`jbs-backdrop ${open ? 'jbs-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Job details"
        className="jbs-sheet"
        style={{
          transform: `translateY(${translateY})`,
          transition,
          opacity: dragY > 180 ? Math.max(0, 1 - (dragY - 180) / 80) : 1,
        }}
        onTouchStart={onSheetTouchStart}
        onTouchMove={onSheetTouchMove}
        onTouchEnd={onSheetTouchEnd}
      >
        {/* Drag handle zone */}
        <div
          className="jbs-sheet__handle-zone"
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
        >
          <div className="jbs-sheet__handle" aria-hidden="true" />
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="jbs-sheet__body">
          {children}
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────
   Main board
───────────────────────────────────────────────────────── */
export function JobsBoardClient() {
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [posted, setPosted] = useState<(typeof POSTED_OPTIONS)[number]['value']>('all')
  const [level, setLevel] = useState<'any' | JobLevel>('any')
  const [employment, setEmployment] = useState<'any' | EmploymentType>('any')
  const [location, setLocation] = useState<string>('any')
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_JOBS[0]?.id ?? null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const locationOptions = useMemo(() => {
    const locs = uniqueLocations(MOCK_JOBS)
    return [{ value: 'any', label: 'Any location' }, ...locs.map((l) => ({ value: l, label: l }))]
  }, [])

  const filtered = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      if (!jobMatchesSearch(job, searchQuery)) return false
      if (posted === 'week' && job.postedDaysAgo > 7) return false
      if (posted === 'month' && job.postedDaysAgo > 30) return false
      if (level !== 'any' && job.level !== level) return false
      if (employment !== 'any' && job.employmentType !== employment) return false
      if (location !== 'any') {
        if (location === 'Remote') {
          if (!job.remoteFriendly && job.workType !== 'Remote') return false
        } else if (job.location !== location) return false
      }
      return true
    })
  }, [searchQuery, posted, level, employment, location])

  const selected = useMemo(
    () => filtered.find((j) => j.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId],
  )

  useEffect(() => {
    if (filtered.length === 0) { setSelectedId(null); return }
    if (!selectedId || !filtered.some((j) => j.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const onSearch = useCallback(() => setSearchQuery(searchInput.trim()), [searchInput])
  const onKeySearch = useCallback((e: React.KeyboardEvent) => { if (e.key === 'Enter') onSearch() }, [onSearch])

  const selectJob = useCallback((id: string) => {
    setSelectedId(id)
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
      setSheetOpen(true)
    }
  }, [])

  const resetFilters = useCallback(() => {
    setSearchInput(''); setSearchQuery(''); setPosted('all')
    setLevel('any'); setEmployment('any'); setLocation('any')
  }, [])

  return (
    <section id="jobs-board" className="jobs-board-shell" aria-label="Job search and listings">
      <div className="jobs-board-inner">

        {/* ── Header / search / filters ── */}
        <header className="jobs-board-header">
          <div className="jobs-board-header__top">
            <div className="jobs-board-header__intro">
              <p className="jobs-board-kicker">Job board</p>
              <h2 className="jobs-board-headline">
                <span className="jobs-board-headline__line jobs-board-headline__line--primary">Find roles that fit you</span>
                <span className="jobs-board-headline__line jobs-board-headline__line--accent">Search, filter, and preview together</span>
              </h2>
              <p className="jobs-board-sub">
                Search by title, company, or keywords. Filters keep the list and detail panel in sync.
              </p>
            </div>
          </div>

          <div className="jobs-board-search-row">
            <div className="jobs-board-search-field">
              <span className="jobs-board-search-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                className="jobs-board-search-input"
                placeholder="Search by title, company, or keywords…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={onKeySearch}
                aria-label="Search jobs"
                style={{ fontFamily: FONT_FAMILY }}
              />
            </div>
            <button type="button" className="jobs-board-btn jobs-board-btn--primary" onClick={onSearch}>Search</button>
          </div>

          <div className="jobs-board-filters" role="group" aria-label="Filter jobs">
            {[
              { label: 'Posted', value: posted, opts: POSTED_OPTIONS, set: (v: string) => setPosted(v as typeof posted) },
              { label: 'Level', value: level, opts: LEVEL_OPTIONS, set: (v: string) => setLevel(v as typeof level) },
              { label: 'Employment type', value: employment, opts: EMPLOYMENT_OPTIONS, set: (v: string) => setEmployment(v as typeof employment) },
            ].map(({ label, value, opts, set }) => (
              <label key={label} className="jobs-board-filter">
                <span className="visually-hidden">{label}</span>
                <select value={value} onChange={(e) => set(e.target.value)} className="jobs-board-select" style={{ fontFamily: FONT_FAMILY }}>
                  {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
            ))}
            <label className="jobs-board-filter jobs-board-filter--grow">
              <span className="visually-hidden">Location</span>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="jobs-board-select" style={{ fontFamily: FONT_FAMILY }}>
                {locationOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <button type="button" className="jobs-board-text-btn" onClick={resetFilters}>Clear filters</button>
          </div>
        </header>

        {/* ── Board layout (list + desktop preview) ── */}
        <div className="jobs-board-layout">

          {/* Job list */}
          <div className="jobs-board-list-col">
            {filtered.length === 0 ? (
              <div className="jobs-board-empty">
                <p style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semi }}>No roles match</p>
                <p className="jobs-board-empty__hint" style={{ fontFamily: FONT_FAMILY }}>
                  Try broader keywords or reset filters to see all sample listings.
                </p>
                <button type="button" className="jobs-board-btn jobs-board-btn--secondary" onClick={resetFilters}>Reset all</button>
              </div>
            ) : (
              <ul className="jobs-board-list" role="list">
                {filtered.map((job) => {
                  const active = selected?.id === job.id
                  return (
                    <li key={job.id} role="none">
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        className={`jobs-board-card ${active ? 'jobs-board-card--active' : ''}`}
                        onClick={() => selectJob(job.id)}
                      >
                        <div className="jobs-board-card__head">
                          <h3 className="jobs-board-card__title">{job.title}</h3>
                          <span className="jobs-board-card__posted">{formatPosted(job.postedDaysAgo)}</span>
                        </div>
                        <p className="jobs-board-card__company" style={{ fontFamily: FONT_FAMILY }}>{job.company}</p>
                        <p className="jobs-board-card__loc" style={{ fontFamily: FONT_FAMILY }}>{job.location}</p>
                        <div className="jobs-board-card__badges">
                          {job.salaryDisplay && <span className="jobs-board-pill">{job.salaryDisplay}</span>}
                          <span className="jobs-board-pill">{job.employmentType}</span>
                          <span className="jobs-board-pill">{job.workType}</span>
                          <span className="jobs-board-pill">{job.level}</span>
                        </div>
                        <p className="jobs-board-card__snippet" style={{ fontFamily: FONT_FAMILY }}>{job.snippet}</p>
                        <p
                          className="jobs-board-card__req-preview"
                          style={{ fontFamily: FONT_FAMILY }}
                          title={job.requirements.join(' · ')}
                        >
                          {job.requirements[0]}
                          {job.requirements.length > 1
                            ? ` · +${job.requirements.length - 1} more requirement${job.requirements.length - 1 === 1 ? '' : 's'}`
                            : ''}
                        </p>
                        <span className="jobs-board-card__cta">View details</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Desktop preview panel */}
          <div className="jobs-board-preview-col">
            {selected ? (
              <JobPreviewContent job={selected} />
            ) : (
              <div className="jobs-board-preview jobs-board-preview--empty">
                <p style={{ fontFamily: FONT_FAMILY }}>Select a role from the list to preview details.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {selected && <JobPreviewContent job={selected} />}
      </BottomSheet>
    </section>
  )
}
