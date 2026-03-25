'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const hay = [
    job.title,
    job.company,
    job.location,
    job.snippet,
    job.description,
    ...job.skills,
    ...job.requirements,
  ]
    .join(' ')
    .toLowerCase()
  return hay.includes(needle)
}

export function JobsBoardClient() {
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [posted, setPosted] = useState<(typeof POSTED_OPTIONS)[number]['value']>('all')
  const [level, setLevel] = useState<'any' | JobLevel>('any')
  const [employment, setEmployment] = useState<'any' | EmploymentType>('any')
  const [location, setLocation] = useState<string>('any')
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_JOBS[0]?.id ?? null)
  const [mobileShowPreview, setMobileShowPreview] = useState(false)

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
    if (filtered.length === 0) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !filtered.some((j) => j.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const onSearch = useCallback(() => {
    setSearchQuery(searchInput.trim())
  }, [searchInput])

  const onKeySearch = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') onSearch()
    },
    [onSearch],
  )

  const selectJob = useCallback((id: string) => {
    setSelectedId(id)
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
      setMobileShowPreview(true)
    }
  }, [])

  return (
    <section
      id="jobs-board"
      className="jobs-board-shell"
      aria-label="Job search and listings"
    >
      <div className="jobs-board-inner">
        <header className="jobs-board-header">
          <div className="jobs-board-header__top">
            <div className="jobs-board-header__intro">
              <p className="jobs-board-kicker">Job board</p>
              <h2 className="jobs-board-headline">
                <span className="jobs-board-headline__line jobs-board-headline__line--primary">
                  Find roles that fit you
                </span>
                <span className="jobs-board-headline__line jobs-board-headline__line--accent">
                  Search, filter, and preview together
                </span>
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
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
            <button type="button" className="jobs-board-btn jobs-board-btn--primary" onClick={onSearch}>
              Search
            </button>
          </div>

          <div className="jobs-board-filters" role="group" aria-label="Filter jobs">
            <label className="jobs-board-filter">
              <span className="visually-hidden">Posted</span>
              <select
                value={posted}
                onChange={(e) => setPosted(e.target.value as typeof posted)}
                className="jobs-board-select"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {POSTED_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="jobs-board-filter">
              <span className="visually-hidden">Level</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as typeof level)}
                className="jobs-board-select"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {LEVEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="jobs-board-filter">
              <span className="visually-hidden">Employment type</span>
              <select
                value={employment}
                onChange={(e) => setEmployment(e.target.value as typeof employment)}
                className="jobs-board-select"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {EMPLOYMENT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="jobs-board-filter jobs-board-filter--grow">
              <span className="visually-hidden">Location</span>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="jobs-board-select"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {locationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="jobs-board-text-btn"
              onClick={() => {
                setSearchInput('')
                setSearchQuery('')
                setPosted('all')
                setLevel('any')
                setEmployment('any')
                setLocation('any')
              }}
            >
              Clear filters
            </button>
          </div>
        </header>

        <div className={`jobs-board-layout ${mobileShowPreview ? 'jobs-board-layout--preview' : ''}`}>
          <div className="jobs-board-list-col">
            {filtered.length === 0 ? (
              <div className="jobs-board-empty">
                <p style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semi }}>No roles match</p>
                <p className="jobs-board-empty__hint" style={{ fontFamily: FONT_FAMILY }}>
                  Try broader keywords or reset filters to see all sample listings.
                </p>
                <button
                  type="button"
                  className="jobs-board-btn jobs-board-btn--secondary"
                  onClick={() => {
                    setSearchInput('')
                    setSearchQuery('')
                    setPosted('all')
                    setLevel('any')
                    setEmployment('any')
                    setLocation('any')
                  }}
                >
                  Reset all
                </button>
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
                        <p className="jobs-board-card__company" style={{ fontFamily: FONT_FAMILY }}>
                          {job.company}
                        </p>
                        <p className="jobs-board-card__loc" style={{ fontFamily: FONT_FAMILY }}>
                          {job.location}
                        </p>
                        <div className="jobs-board-card__badges">
                          {job.salaryDisplay ? (
                            <span className="jobs-board-pill">{job.salaryDisplay}</span>
                          ) : null}
                          <span className="jobs-board-pill">{job.employmentType}</span>
                          <span className="jobs-board-pill">{job.workType}</span>
                          <span className="jobs-board-pill">{job.level}</span>
                        </div>
                        <p className="jobs-board-card__snippet" style={{ fontFamily: FONT_FAMILY }}>
                          {job.snippet}
                        </p>
                        <p
                          className="jobs-board-card__req-preview"
                          style={{ fontFamily: FONT_FAMILY }}
                          title={job.requirements.join(' · ')}
                        >
                          {job.requirements[0]}
                          {job.requirements.length > 1
                            ? ` · +${job.requirements.length - 1} more requirement${
                                job.requirements.length - 1 === 1 ? '' : 's'
                              }`
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

          <div className="jobs-board-preview-col">
            {mobileShowPreview && (
              <button
                type="button"
                className="jobs-board-back"
                onClick={() => setMobileShowPreview(false)}
              >
                ← Back to list
              </button>
            )}
            {selected ? (
              <article className="jobs-board-preview" aria-live="polite">
                <header className="jobs-board-preview__head">
                  <h2 className="jobs-board-preview__title">
                    {selected.title}
                  </h2>
                  <p className="jobs-board-preview__meta" style={{ fontFamily: FONT_FAMILY }}>
                    <span className="jobs-board-preview__company">{selected.company}</span>
                    <span className="jobs-board-preview__dot" aria-hidden>
                      ·
                    </span>
                    <span>{selected.location}</span>
                    <span className="jobs-board-preview__dot" aria-hidden>
                      ·
                    </span>
                    <span>{formatPosted(selected.postedDaysAgo)}</span>
                  </p>
                  <div className="jobs-board-preview__badges">
                    <span className="jobs-board-pill">{selected.employmentType}</span>
                    <span className="jobs-board-pill">{selected.workType}</span>
                    <span className="jobs-board-pill">{selected.level}</span>
                  </div>
                </header>

                <div className="jobs-board-preview__actions">
                  <a
                    href={selected.applyUrl}
                    className="jobs-board-btn jobs-board-btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply now
                  </a>
                  <a
                    href={selected.careerUrl}
                    className="jobs-board-btn jobs-board-btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Career site
                  </a>
                </div>

                <div className="jobs-board-insights">
                  <h3 className="jobs-board-insights__title">At a glance</h3>
                  <dl className="jobs-board-insights__grid">
                    <div className="jobs-board-insight">
                      <dt>Location</dt>
                      <dd>{selected.location}</dd>
                    </div>
                    <div className="jobs-board-insight">
                      <dt>Compensation</dt>
                      <dd>{selected.salaryDisplay ?? 'Not listed'}</dd>
                    </div>
                    <div className="jobs-board-insight">
                      <dt>Work style</dt>
                      <dd>{selected.workType}</dd>
                    </div>
                    <div className="jobs-board-insight">
                      <dt>Employment</dt>
                      <dd>{selected.employmentType}</dd>
                    </div>
                  </dl>
                </div>

                <section className="jobs-board-section">
                  <h3 className="jobs-board-section__title">About the role</h3>
                  <p className="jobs-board-section__body" style={{ fontFamily: FONT_FAMILY }}>
                    {selected.description}
                  </p>
                </section>

                <section className="jobs-board-section">
                  <h3 className="jobs-board-section__title">
                    Requirements
                  </h3>
                  <ul className="jobs-board-bullets" style={{ fontFamily: FONT_FAMILY }}>
                    {selected.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </section>

                <section className="jobs-board-section">
                  <h3 className="jobs-board-section__title">
                    Skills & keywords
                  </h3>
                  <div className="jobs-board-skills">
                    {selected.skills.map((s) => (
                      <span key={s} className="jobs-board-skill">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>

              </article>
            ) : (
              <div className="jobs-board-preview jobs-board-preview--empty">
                <p style={{ fontFamily: FONT_FAMILY }}>Select a role from the list to preview details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
