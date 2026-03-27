import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-inner">
        <div className="footer-left">
          <div className="footer-mark">DesignOps</div>
          <p className="footer-desc">
            Case study — Design Operations transformation across e-commerce
            and SaaS platforms serving 500k users and 200k active members.
          </p>
        </div>
        <div className="footer-right">
          <div className="footer-meta-row">
            <span className="footer-meta-label">Scope</span>
            <span className="footer-meta-value">E-Commerce · SaaS · Multi-dept</span>
          </div>
          <div className="footer-meta-row">
            <span className="footer-meta-label">Impact</span>
            <span className="footer-meta-value">75% faster delivery · 65% fewer iterations</span>
          </div>
          <div className="footer-meta-row">
            <span className="footer-meta-label">Level</span>
            <span className="footer-meta-value">Director / Head of Design Ops</span>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <div className="section-container">
          <span className="footer-copy">Portfolio case study · Design Operations</span>
        </div>
      </div>
    </footer>
  )
}
