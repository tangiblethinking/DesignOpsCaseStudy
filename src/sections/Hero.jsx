import React, { useEffect, useRef, useState } from 'react'
import { useCounter } from '../hooks'
import './Hero.css'

function StatCounter({ value, suffix = '', prefix = '', label, tooltip, delay = 0 }) {
  const [started, setStarted] = useState(false)
  const wrapRef = useRef(null)
  const numRef = useCounter(value, 1600, started)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
        { threshold: 0.5 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="hero-stat reveal" ref={wrapRef} style={{ transitionDelay: `${delay}ms` }}>
      <div className="hero-stat-number">
        {prefix}<span ref={numRef}>0</span>{suffix}
      </div>
      <div className="hero-stat-label">{label}</div>
      {tooltip && <div className="hero-stat-tooltip">{tooltip}</div>}
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal for hero text
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.reveal, .reveal-left')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Trigger reveals immediately for hero
  useEffect(() => {
    setTimeout(() => {
      const els = heroRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      els?.forEach(el => el.classList.add('visible'))
    }, 100)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {/* Parallax background grid */}
      <div
        className="hero-bg-grid"
        ref={bgRef}
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />
      <div className="hero-bg-accent" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />

      <div className="section-container hero-inner">
        <div className="hero-content">
          <div className="reveal d1">
            <span className="label-chip">
              <span className="material-icons" style={{ fontSize: 12 }}>architecture</span>
              Design Operations
            </span>
          </div>

          <h1 className="hero-headline reveal d2">
            From Chaos<br />
            <em>to Operating</em><br />
            System
          </h1>

          <p className="hero-sub reveal d3">
            Transforming design delivery across e-commerce and SaaS platforms —
            aligning departments, eliminating rework, and building the operational
            infrastructure that scaled to 500k users.
          </p>

          <div className="hero-tags reveal d4">
            <span className="hero-tag">E-Commerce Storefront</span>
            <span className="hero-tag">Virtual Office SaaS</span>
            <span className="hero-tag">500k Users · 200k Members</span>
          </div>
        </div>

        <div className="hero-stats">
          <StatCounter value={75} suffix="%" label="Faster delivery" tooltip="Intake-to-release time reduced from 4–8 weeks down to 1–3 weeks" delay={200} />
          <StatCounter value={87} suffix="%" label="Fewer iterations" tooltip="Design revision cycles dropped from 20+ iterations to 2–7" delay={350} />
          <StatCounter value={4} suffix="+" label="Depts aligned" tooltip="Marketing, design, development, and operations unified under one framework" delay={500} />
          <StatCounter value={0} suffix=" risk" prefix="↓" label="Revenue disruption" tooltip="High-impact systems (checkout, compensation, membership) now pre-evaluated before any release" delay={650} />
        </div>
      </div>

      <div className="hero-scroll-cue reveal d6">
        <span className="material-icons" style={{ fontSize: 20, color: 'var(--ink-40)' }}>south</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
