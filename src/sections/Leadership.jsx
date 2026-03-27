import React, { useEffect, useRef, useState } from 'react'
import './Leadership.css'

const competencies = [
  {
    icon: 'hub',
    title: 'Systems Thinking',
    summary: 'Designed a framework that operationalized delivery across complex product ecosystems.',
    expanded: 'Diagnosed the root cause as organizational rather than technical. Built a system where Jira, SharePoint, and Figma became connected tools — not isolated silos. Each component of the framework reinforced the others: intake fed routing, routing fed visibility, visibility fed governance.',
    tag: 'Director Level',
  },
  {
    icon: 'handshake',
    title: 'Cross-Functional Diplomacy',
    summary: 'Aligned marketing, design, development, and executives around a single workflow.',
    expanded: 'Different departments communicated differently — marketing used email, dev used Jira, executives used direct messages. The framework abstracted these differences into one intake system without forcing behavior change, meeting each team in their existing context.',
    tag: 'Strategic',
  },
  {
    icon: 'trending_up',
    title: 'Business Awareness',
    summary: 'Reduced risk in revenue-critical and member-trust-critical systems.',
    expanded: 'Identified that checkout, compensation dashboards, and Virtual Office metrics carried asymmetric risk — a bad release could disrupt revenue or break trust more than any delay would. Built the governance layer specifically around these high-stakes systems.',
    tag: 'Executive Readiness',
  },
  {
    icon: 'scale',
    title: 'Operational Scaling',
    summary: 'Standardized processes became company-wide SOP, enabling sustainable growth.',
    expanded: 'The framework wasn\'t built for design alone — it scaled to support marketing, development, and operations with varying communication styles. It became the standard operating procedure across all departments, not just a design team workaround.',
    tag: 'Org Impact',
  },
  {
    icon: 'auto_awesome',
    title: 'Technical Excellence',
    summary: 'Ensured UX best practices guided every feature across e-commerce and SaaS.',
    expanded: 'With clearer requirements and fewer iteration cycles, design quality improved — not just speed. Teams could invest cognitive energy into solving the right problem instead of re-interpreting unclear briefs. The operational fix created the conditions for better product work.',
    tag: 'Craft',
  },
]

export default function Leadership() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(null)

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
    <section className="leadership-section" ref={ref}>
      <div className="section-container">
        <div className={`leadership-header reveal ${visible ? 'visible' : ''}`}>
          <span className="label-chip">
            <span className="material-icons" style={{ fontSize: 12 }}>stars</span>
            Leadership Signals
          </span>
          <h2 className="section-heading">
            Director-level impact
          </h2>
          <p className="section-subhead">
            Five dimensions of leadership demonstrated across this engagement.
            Click any card to expand the rationale.
          </p>
        </div>

        <div className="leadership-grid">
          {competencies.map((comp, i) => (
            <div
              key={comp.title}
              className={`leadership-card reveal d${Math.min(i + 1, 5)} ${visible ? 'visible' : ''} ${expanded === i ? 'leadership-card-open' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="leadership-card-top">
                <div className="leadership-icon-wrap">
                  <span className="material-icons">{comp.icon}</span>
                </div>
                <span className="leadership-tag">{comp.tag}</span>
                <span className={`leadership-toggle material-icons`}>
                  {expanded === i ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              <h3 className="leadership-title">{comp.title}</h3>
              <p className="leadership-summary">{comp.summary}</p>
              {expanded === i && (
                <div className="leadership-expanded">
                  <div className="leadership-expanded-divider" />
                  <p className="leadership-expanded-text">{comp.expanded}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Takeaway */}
        <div className={`takeaway reveal ${visible ? 'visible' : ''} d5`}>
          <div className="takeaway-icon">
            <span className="material-icons">lightbulb</span>
          </div>
          <div className="takeaway-body">
            <div className="takeaway-label">60-second executive takeaway</div>
            <p className="takeaway-text">
              Within 60 seconds, a design VP sees measurable delivery impact, organizational maturity advancement,
              risk mitigation on business-critical systems, cross-departmental alignment,
              and a framework that became company SOP. This signals senior-level Design Operations competence immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
