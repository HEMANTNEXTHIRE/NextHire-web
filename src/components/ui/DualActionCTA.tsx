import Link from 'next/link'
import { SERIF } from '@/constants/typography'


interface DualActionCTAProps {
  leftTitle?: string
  leftSubtitle?: string
  leftLabel?: string
  leftHref?: string
  rightTitle?: string
  rightSubtitle?: string
  rightLabel?: string
  rightHref?: string
}

const APP_URL = 'https://app.nexthireconsulting.com'

export default function DualActionCTA({
  leftTitle = 'GET STARTED',
  leftSubtitle = 'Kickstart Your Career Journey',
  leftLabel = 'Try for free',
  leftHref = APP_URL,
  rightTitle = 'TALK TO AN EXPERT',
  rightSubtitle = 'Build a team that wins',
  rightLabel = 'Schedule Now',
  rightHref = '/contact-us',
}: DualActionCTAProps) {
  const isExternalLeft = leftHref.startsWith('http')
  return (
    <section id="dual-action-cta" className="dual-action-button-cta js-dual-action-button-cta">
      <div className="dual-action-button-cta-wrapper">
        <div className="dual-action-button-cta-left-div js-dual-action-button-cta-left-div">
          <div className="dual-action-button-cta-tag-wrapper">
            <p className="dual-action-button-cta-tag-left" style={{ fontFamily: SERIF }}>{leftTitle}</p>
          </div>

          <h2 className="dual-action-button-cta-left-div-heading" style={{ fontFamily: SERIF, fontWeight: 400 }}>{leftSubtitle}</h2>

          <div className="dual-action-button-cta-left-div-inner js-dual-action-button-cta-left-div-inner">
            {isExternalLeft ? (
              <a href={leftHref} target="_blank" rel="noopener noreferrer" className="button-primary dual-action-button-cta-left-div-inner-button w-button">
                {leftLabel}
              </a>
            ) : (
              <Link href={leftHref} className="button-primary dual-action-button-cta-left-div-inner-button w-button">
                {leftLabel}
              </Link>
            )}
          </div>
          <img alt="" className="dual-action-button-cta-left-div-pattern-mobile" loading="lazy" src="https://cdn.prod.website-files.com/660dcc7f45ad8881324199b5/6626c34d918de4b3cbec4ac4_shapev2.avif" />
        </div>

        <div className="dual-action-button-cta-right-div js-dual-action-button-cta-right-div">
          <div className="dual-action-button-cta-tag-wrapper">
            <p className="dual-action-button-cta-tag-right" style={{ fontFamily: SERIF }}>{rightTitle}</p>
          </div>

          <h2 className="dual-action-button-cta-right-div-heading" style={{ fontFamily: SERIF, fontWeight: 400 }}>{rightSubtitle}</h2>

          <div className="dual-action-button-cta-right-div-inner js-dual-action-button-cta-right-div-inner">
            <Link href={rightHref} className="button-secondary dual-action-button-cta-right-div-inner-button js-dual-action-button-cta-right-div-inner-button button-secondary-mobile w-button">
              {rightLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
