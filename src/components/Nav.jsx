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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
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

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner section-container">
          <div className="nav-brand">
            <span className="material-icons" style={{ fontSize: 16, color: 'var(--accent)' }}>architecture</span>
            <span className="nav-brand-text">Design Ops</span>
          </div>

          {/* Desktop links */}
          <div className="nav-links nav-desktop">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link ${active === id ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="material-icons">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down drawer */}
      <div className={`nav-drawer ${menuOpen ? 'nav-drawer-open' : ''}`}>
        <div className="nav-drawer-inner">
          {navItems.map((item, i) => {
            const id = item.href.replace('#', '')
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`nav-drawer-link ${active === id ? 'nav-drawer-link-active' : ''}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="nav-drawer-link-label">{item.label}</span>
                <span className="material-icons" style={{ fontSize: 18, color: 'var(--ink-40)' }}>arrow_forward</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  )
}
