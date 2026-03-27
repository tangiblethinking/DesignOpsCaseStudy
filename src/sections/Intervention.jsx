import React, { useEffect, useRef } from 'react'
import Tooltip from '../components/Tooltip'
import './Intervention.css'

const pillars = [
  {
    num: '01',
    icon: 'input',
    title: 'Structured Intake',
    summary: 'Every request required a problem statement, desired outcome, success criteria, and impacted systems.',
    tooltip: 'Eliminated work starting without clarity. Reduced subjective interpretation that caused 20+ iteration cycles.',
  },
  {
    num: '02',
    icon: 'account_tree',
    title: 'Cross-Dept Routing',
    summary: 'Tickets tracked submitter, owner, current state, and department — with automatic routing to the correct team.',
    tooltip: 'All stakeholders gained visibility into request progress, eliminating status follow-ups and duplicate submissions.',
  },
  {
    num: '03',
    icon: 'verified_user',
    title: 'Governance Layer',
    summary: 'Department stakeholders acted as approvers. Executive overrides absorbed via documented escalation paths.',
    tooltip: 'Priority conflicts eliminated without friction. Executive requests entered the same system — they were just prioritized differently.',
  },
  {
    num: '04',
    icon: 'shield',
    title: 'Risk Management',
    summary: 'High-impact systems underwent pre-evaluation to prevent revenue or trust disruption before any release.',
    tooltip: 'Checkout, compensation dashboards, and Virtual Office metrics required sign-off before development began.',
  },
  {
    num: '05',
    icon: 'groups',
    title: 'Framework Adoption',
    summary: 'Standard operating procedure across design, development, marketing, and operations company-wide.',
    tooltip: 'Scaled to support teams with varying communication styles. Became the company SOP — not just a design team process.',
  },
]

const beforeFlow = [
  { icon: 'person', label: 'Stakeholder request', note: 'Via any channel' },
  { icon: 'arrow_downward', label: null },
  { icon: 'groups', label: 'Direct to team', note: 'No intake process' },
  { icon: 'arrow_downward', label: null },
  { icon: 'help_outline', label: 'Unclear requirements', note: 'Subjective interpretation' },
  { icon: 'arrow_downward', label: null },
  { icon: 'repeat', label: '20+ iterations', note: 'Excessive rework' },
  { icon: 'arrow_downward', label: null },
  { icon: 'hourglass_empty', label: 'Delayed release', note: '4–8 weeks' },
]

const afterFlow = [
  { icon: 'person', label: 'Stakeholder request', note: 'Single intake path' },
  { icon: 'arrow_downward', label: null },
  { icon: 'checklist', label: 'Structured intake', note: 'Success criteria required' },
  { icon: 'arrow_downward', label: null },
  { icon: 'account_tree', label: 'Routing & ownership', note: 'Tracked, visible, assigned' },
  { icon: 'arrow_downward', label: null },
  { icon: 'build', label: 'Design + dev execution', note: '2–7 iterations max' },
  { icon: 'arrow_downward', label: null },
  { icon: 'rocket_launch', label: 'Release + tracking', note: '1–3 weeks' },
]

function FlowStep({ icon, label, note, isArrow, variant }) {
  if (isArrow) {
    return (
      <div className={`flow-arrow flow-arrow-${variant}`}>
        <span className="material-icons" style={{ fontSize: 18 }}>{icon}</span>
      </div>
    )
  }
  return (
    <div className={`flow-step flow-step-${variant}`}>
      <span className="material-icons flow-step-icon">{icon}</span>
      <div>
        <div className="flow-step-label">{label}</div>
        {note && <div className="flow-step-note">{note}</div>}
      </div>
    </div>
  )
}

export default function Intervention() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="intervention-section" ref={ref}>
      <div className="section-container">
        <div className="intervention-header">
          <div className="reveal">
            <span className="label-chip">
              <span className="material-icons" style={{ fontSize: 12 }}>settings_suggest</span>
              The Intervention
            </span>
          </div>
          <h2 className="section-heading reveal d1">
            A scalable Design<br />Operations framework
          </h2>
          <p className="section-subhead reveal d2">
            The problem was organizational, not technical. The fix required an operational
            framework — not new tools, but new rules for how existing tools connected.
          </p>
        </div>

        {/* Framework pillars */}
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div className={`pillar-card reveal d${Math.min(i + 1, 5)}`} key={p.num}>
              <div className="pillar-num">{p.num}</div>
              <div className="pillar-icon-wrap">
                <span className="material-icons">{p.icon}</span>
              </div>
              <Tooltip text={p.tooltip} icon={false}>
                <h3 className="pillar-title">{p.title}</h3>
              </Tooltip>
              <p className="pillar-summary">{p.summary}</p>
            </div>
          ))}
        </div>

        {/* Before / After workflow */}
        <div className="workflow-comparison reveal">
          <div className="workflow-col workflow-before">
            <div className="workflow-col-header">
              <span className="material-icons" style={{ fontSize: 16 }}>cancel</span>
              Before
            </div>
            <div className="workflow-flow">
              {beforeFlow.map((step, i) =>
                step.label === null ? (
                  <FlowStep key={i} icon={step.icon} isArrow variant="before" />
                ) : (
                  <FlowStep key={i} {...step} variant="before" />
                )
              )}
            </div>
          </div>

          <div className="workflow-divider">
            <div className="workflow-divider-line" />
            <div className="workflow-divider-badge">
              <span className="material-icons" style={{ fontSize: 20 }}>compare_arrows</span>
            </div>
            <div className="workflow-divider-line" />
          </div>

          <div className="workflow-col workflow-after">
            <div className="workflow-col-header">
              <span className="material-icons" style={{ fontSize: 16 }}>check_circle</span>
              After
            </div>
            <div className="workflow-flow">
              {afterFlow.map((step, i) =>
                step.label === null ? (
                  <FlowStep key={i} icon={step.icon} isArrow variant="after" />
                ) : (
                  <FlowStep key={i} {...step} variant="after" />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
