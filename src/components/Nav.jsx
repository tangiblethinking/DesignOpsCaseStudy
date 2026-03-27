import React, { useEffect, useState } from 'react'
import './Nav.css'

const navItems = [
  { label: 'Problem', href: '#problem' },
  { label: 'Framework', href: '#intervention' },
  { label: 'Results', href: '#metrics' },
  { label: 'Maturity', href: '#maturity' },
  { label: 'Leadership', href: '#leadership' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Update active section
      const sections = ['problem', 'intervention', 'metrics', 'maturity', 'leadership']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner section-container">
        <div className="nav-brand">
          <span className="material-icons" style={{ fontSize: 16, color: 'var(--accent)' }}>architecture</span>
          <span className="nav-brand-text">Design Ops</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${active === id ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
