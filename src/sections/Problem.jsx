import React, { useEffect, useRef } from 'react'
import Tooltip from '../components/Tooltip'
import './Problem.css'

const chaosItems = [
  {
    icon: 'forum',
    label: 'Fragmented requests',
    detail: 'Requests arrived via meetings, emails, Slack, and direct executive contact — no single intake path, no format standard.',
  },
  {
    icon: 'swap_vert',
    label: 'Executive overrides',
    detail: 'High-priority requests bypassed active work mid-sprint, creating competing priorities and derailing planned delivery.',
  },
  {
    icon: 'visibility_off',
    label: 'No visibility',
    detail: 'No system tracked ownership, request status, or dependencies. Teams had no shared view of what was in flight.',
  },
  {
    icon: 'repeat',
    label: '20+ design iterations',
    detail: 'Unclear requirements led to repeated rework cycles — teams built to subjective interpretations instead of defined success criteria.',
  },
  {
    icon: 'warning',
    label: 'Unmanaged risk',
    detail: 'Revenue-critical systems (checkout, compensation dashboards, membership nav) had no pre-evaluation layer before launch.',
  },
  {
    icon: 'schedule',
    label: '4–8 week timelines',
    detail: 'Without structured intake or clear ownership, delivery predictability was low and delays were the norm, not the exception.',
  },
]

const affectedSystems = [
  { label: 'E-commerce storefront', impact: 'Revenue', color: 'danger' },
  { label: 'Virtual Office SaaS', impact: 'Member retention', color: 'accent' },
  { label: 'Compensation dashboards', impact: 'Payout trust', color: 'amber' },
  { label: 'Checkout & membership nav', impact: 'Conversion rates', color: 'success' },
]

export default function Problem() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="problem-section" ref={ref}>
      <div className="section-container">
        <div className="problem-header">
          <div className="reveal">
            <span className="label-chip">
              <span className="material-icons" style={{ fontSize: 12 }}>report_problem</span>
              The Problem
            </span>
          </div>
          <h2 className="section-heading reveal d1">
            Design delivery was<br />
            <em style={{ fontStyle: 'italic', color: 'var(--danger)' }}>organizationally broken</em>
          </h2>
          <p className="section-subhead reveal d2">
            The tools existed. The talent existed. What was missing was the operating system
            to connect them — requests had no structure, ownership had no clarity, and
            revenue-critical systems had no protection.
          </p>
        </div>

        {/* Chaos grid */}
        <div className="chaos-grid">
          {chaosItems.map((item, i) => (
            <div className={`chaos-card reveal d${Math.min(i + 1, 6)}`} key={item.label}>
              <div className="chaos-card-icon">
                <span className="material-icons">{item.icon}</span>
              </div>
              <div className="chaos-card-body">
                <Tooltip text={item.detail} icon={true}>
                  <span className="chaos-card-label">{item.label}</span>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        {/* Affected systems */}
        <div className="affected-systems reveal">
          <div className="affected-label">
            <span className="material-icons" style={{ fontSize: 14 }}>bolt</span>
            Critical systems at risk
          </div>
          <div className="affected-list">
            {affectedSystems.map((s) => (
              <div className={`affected-item affected-${s.color}`} key={s.label}>
                <span className="affected-name">{s.label}</span>
                <span className="affected-impact">{s.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
