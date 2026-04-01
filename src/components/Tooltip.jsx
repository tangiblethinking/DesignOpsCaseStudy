import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function Tooltip({ children, text, icon = true }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, placement: 'above' })
  const triggerRef = useRef(null)
  const TOOLTIP_WIDTH = 240
  const TOOLTIP_OFFSET = 12

  const compute = () => {
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    const padding = 12
    let left = rect.left + scrollX + rect.width / 2 - TOOLTIP_WIDTH / 2
    left = Math.max(padding, Math.min(left, vw + scrollX - TOOLTIP_WIDTH - padding))
    const placement = rect.top > 120 ? 'above' : 'below'
    const top = placement === 'above'
      ? rect.top + scrollY - TOOLTIP_OFFSET
      : rect.bottom + scrollY + TOOLTIP_OFFSET
    setPos({ top, left, placement })
  }

  const show = () => { compute(); setVisible(true) }
  const hide = () => setVisible(false)

  useEffect(() => {
    if (!visible) return
    const handler = () => compute()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [visible])

  const tooltipEl = visible ? ReactDOM.createPortal(
    <div style={{
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      width: TOOLTIP_WIDTH,
      zIndex: 9999,
      pointerEvents: 'none',
      transform: pos.placement === 'above' ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <div className="portal-tooltip" data-placement={pos.placement}>
        {text}
      </div>
    </div>,
    document.body
  ) : null

  return (
    <span
      ref={triggerRef}
      className="tooltip-trigger"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
      {icon && <span className="material-icons tooltip-icon">info</span>}
      {tooltipEl}
    </span>
  )
}
