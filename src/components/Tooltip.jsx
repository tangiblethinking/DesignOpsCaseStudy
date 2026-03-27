import React from 'react'

export default function Tooltip({ children, text, icon = true }) {
  return (
    <span className="tooltip-wrap">
      {children}
      {icon && (
        <span className="material-icons" style={{ fontSize: 14, color: 'var(--ink-40)', marginLeft: 4 }}>
          info
        </span>
      )}
      <span className="tooltip-box">{text}</span>
    </span>
  )
}
