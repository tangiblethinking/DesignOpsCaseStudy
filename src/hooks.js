import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (!options.repeat) observer.unobserve(entry.target)
          }
        })
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    )

    // Observe either all .reveal children or the element itself
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t))
    } else {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [options.repeat, options.threshold, options.rootMargin])

  return ref
}

export function useCounter(target, duration = 1800, start = false) {
  // Returns a ref to a DOM element and animates count when triggered
  const ref = useRef(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!start || animatedRef.current) return
    const el = ref.current
    if (!el) return
    animatedRef.current = true

    const startTime = performance.now()
    const isFloat = String(target).includes('.')
    const decimals = isFloat ? String(target).split('.')[1].length : 0

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      el.textContent = isFloat ? current.toFixed(decimals) : Math.round(current).toLocaleString()
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [start, target, duration])

  return ref
}
