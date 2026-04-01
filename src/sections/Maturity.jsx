import React, { useEffect, useRef, useState } from 'react'
import './Maturity.css'

const capabilities = [
  {
    capability: 'Request intake',
    before: 'Informal',
    after: 'Standardized & structured',
    beforeLevel: 1,
    afterLevel: 5,
    tooltip: 'Requests went from arriving via any channel at any time to a single structured intake form with mandatory fields.',
  },
  {
    capability: 'Requirement definition',
    before: 'Inconsistent',
    after: 'Documented success criteria',
    beforeLevel: 1,
    afterLevel: 5,
    tooltip: 'Teams now agree on what "done" looks like before work begins — eliminating the main driver of iteration cycles.',
  },
  {
    capability: 'Ownership visibility',
    before: 'Limited',
    after: 'Transparent ticket tracking',
    beforeLevel: 2,
    afterLevel: 5,
    tooltip: 'Every request has a named owner, current state, and department visible to all stakeholders in real time.',
  },
  {
    capability: 'Prioritization',
    before: 'Reactive',
    after: 'Stakeholder-approved',
    beforeLevel: 1,
    afterLevel: 4,
    tooltip: 'Priority is now set through a governance layer — not by whoever sent the last Slack message.',
  },
  {
    capability: 'Delivery predictability',
    before: 'Low',
    after: 'High, repeatable',
    beforeLevel: 1,
    afterLevel: 5,
    tooltip: 'Teams can now forecast delivery dates because requirements are clear, ownership is defined, and blockers are tracked.',
  },
  {
    capability: 'Operational risk',
    before: 'Unmanaged',
    after: 'Mitigated',
    beforeLevel: 1,
    afterLevel: 4,
    tooltip: 'High-impact systems (checkout, compensation, membership) now require pre-evaluation sign-off before any design work starts.',
  },
]

function MaturityBar({ level, max = 5, variant }) {
  return (
    <div className="maturity-bar-wrap">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`maturity-pip ${i < level ? `maturity-pip-filled maturity-pip-${variant}` : ''}`}
        />
      ))}
    </div>
  )
}

export default function Maturity() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="maturity-section" ref={ref}>
      <div className="section-container">
        <div className={`maturity-header reveal ${visible ? 'visible' : ''}`}>
          <span className="label-chip">
            <span className="material-icons" style={{ fontSize: 12 }}>show_chart</span>
            Organizational Maturity
          </span>
          <h2 className="section-heading">
            Capability advancement
          </h2>
          <p className="section-subhead">
            The framework advanced the organization's operational maturity across every
            design-adjacent function. Hover or tap each row for detail.
          </p>
        </div>

        <div className={`maturity-table reveal ${visible ? 'visible' : ''} d2`}>
          {/* Desktop header */}
          <div className="maturity-table-header">
            <div className="maturity-col-capability">Capability</div>
            <div className="maturity-col-state">
              <span className="maturity-header-before">Before</span>
            </div>
            <div className="maturity-col-level">Level</div>
            <div className="maturity-col-state">
              <span className="maturity-header-after">After</span>
            </div>
            <div className="maturity-col-level">Level</div>
          </div>

          {capabilities.map((cap, i) => (
            <div
              key={cap.capability}
              className={`maturity-row reveal ${visible ? 'visible' : ''} d${Math.min(i + 2, 6)} ${active === i ? 'maturity-row-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Desktop: 5 columns */}
              <div className="maturity-col-capability">
                <span className="maturity-cap-label">{cap.capability}</span>
              </div>
              <div className="maturity-col-state">
                <span className="maturity-state-before">{cap.before}</span>
              </div>
              <div className="maturity-col-level">
                <MaturityBar level={cap.beforeLevel} variant="before" />
              </div>
              <div className="maturity-col-state">
                <span className="maturity-state-after">{cap.after}</span>
              </div>
              <div className="maturity-col-level">
                <MaturityBar level={cap.afterLevel} variant="after" />
              </div>

              {/* Tooltip on hover/tap */}
              {active === i && (
                <div className="maturity-row-tooltip">{cap.tooltip}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
