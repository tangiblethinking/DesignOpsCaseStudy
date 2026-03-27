import React, { useState, useEffect, useRef } from 'react'
import './Metrics.css'

const metrics = [
  {
    label: 'Delivery timeline',
    tooltip: 'From intake request to production release',
    before: { value: '4–8 weeks', raw: 8, unit: 'wks', description: 'Unpredictable, often slipping further' },
    after: { value: '1–3 weeks', raw: 3, unit: 'wks', description: 'Consistent, trackable, predictable' },
    icon: 'schedule',
    improvement: '75% faster',
  },
  {
    label: 'Design iterations',
    tooltip: 'Average revision cycles per project',
    before: { value: '20+ cycles', raw: 20, unit: '', description: 'Driven by unclear requirements' },
    after: { value: '2–7 cycles', raw: 7, unit: '', description: 'Defined success criteria up front' },
    icon: 'loop',
    improvement: '65% fewer',
  },
  {
    label: 'Requirement clarity',
    tooltip: 'How requirements were defined at project start',
    before: { value: 'Subjective', raw: null, unit: '', description: 'Interpreted differently by each team' },
    after: { value: 'Documented', raw: null, unit: '', description: 'Agreed criteria before work begins' },
    icon: 'assignment',
    improvement: 'Standardized',
  },
  {
    label: 'Delivery predictability',
    tooltip: 'Confidence level in hitting estimated release dates',
    before: { value: 'Low', raw: null, unit: '', description: 'No visibility into blockers or status' },
    after: { value: 'High', raw: null, unit: '', description: 'Tracked milestones, escalation paths' },
    icon: 'trending_up',
    improvement: 'Transformed',
  },
  {
    label: 'Operational risk',
    tooltip: 'Risk exposure on revenue and trust-critical systems',
    before: { value: 'Unmanaged', raw: null, unit: '', description: 'No pre-evaluation for high-stakes releases' },
    after: { value: 'Mitigated', raw: null, unit: '', description: 'Pre-release review on all critical systems' },
    icon: 'shield',
    improvement: 'Eliminated',
  },
  {
    label: 'Cross-team friction',
    tooltip: 'Coordination overhead between marketing, design, and dev',
    before: { value: 'High', raw: null, unit: '', description: 'Competing priorities, unclear ownership' },
    after: { value: 'Low', raw: null, unit: '', description: 'Shared workflow, visible ownership' },
    icon: 'handshake',
    improvement: 'Resolved',
  },
]

function MetricCard({ metric, showAfter }) {
  const [hovered, setHovered] = useState(false)
  const data = showAfter ? metric.after : metric.before

  return (
    <div
      className={`metric-card ${showAfter ? 'metric-card-after' : 'metric-card-before'} ${hovered ? 'metric-card-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="metric-card-top">
        <div className={`metric-icon-wrap ${showAfter ? 'metric-icon-after' : 'metric-icon-before'}`}>
          <span className="material-icons">{metric.icon}</span>
        </div>
        <div className="metric-improvement-badge" style={{ opacity: showAfter ? 1 : 0 }}>
          {metric.improvement}
        </div>
      </div>
      <div className="metric-label">{metric.label}</div>
      <div className={`metric-value ${showAfter ? 'metric-value-after' : 'metric-value-before'}`}>
        {data.value}
      </div>
      <div className="metric-desc">{data.description}</div>
      {hovered && (
        <div className="metric-hover-tip">{metric.tooltip}</div>
      )}
    </div>
  )
}

export default function Metrics() {
  const ref = useRef(null)
  const [showAfter, setShowAfter] = useState(false)
  const [sliderVal, setSliderVal] = useState(0)
  const [visible, setVisible] = useState(false)

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

  const handleSlider = (e) => {
    const val = Number(e.target.value)
    setSliderVal(val)
    setShowAfter(val > 50)
  }

  return (
    <section className="metrics-section" ref={ref}>
      <div className="section-container">
        <div className={`metrics-header reveal ${visible ? 'visible' : ''}`}>
          <span className="label-chip">
            <span className="material-icons" style={{ fontSize: 12 }}>bar_chart</span>
            Measurable Results
          </span>
          <h2 className="section-heading">
            Numbers that moved
          </h2>
          <p className="section-subhead">
            Slide to reveal what changed. Every metric reflects a direct outcome
            of the operational framework — not incidental improvement.
          </p>
        </div>

        {/* Slider control */}
        <div className={`slider-control reveal ${visible ? 'visible' : ''} d2`}>
          <span className={`slider-pole ${!showAfter ? 'slider-pole-active' : ''}`}>
            <span className="material-icons" style={{ fontSize: 14 }}>cancel</span>
            Before
          </span>
          <div className="slider-track-wrap">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={handleSlider}
              className="metrics-slider"
            />
            <div
              className="slider-fill"
              style={{ width: `${sliderVal}%`, background: showAfter ? 'var(--success)' : 'var(--danger)' }}
            />
          </div>
          <span className={`slider-pole ${showAfter ? 'slider-pole-active slider-pole-success' : ''}`}>
            <span className="material-icons" style={{ fontSize: 14 }}>check_circle</span>
            After
          </span>
        </div>

        {/* State label */}
        <div className={`slider-state-label ${showAfter ? 'slider-state-after' : 'slider-state-before'} reveal ${visible ? 'visible' : ''} d3`}>
          {showAfter ? 'Post-framework implementation' : 'Pre-framework — baseline state'}
        </div>

        {/* Metrics grid */}
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={m.label} className={`reveal ${visible ? 'visible' : ''} d${Math.min(i + 1, 5)}`}>
              <MetricCard metric={m} showAfter={showAfter} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
