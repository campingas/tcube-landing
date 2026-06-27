import { qsAll } from '@/utils/dom'

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function revealOnScroll(
  selector: string,
  className = 'animate-fade-up',
): void {
  if (REDUCED) {
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 },
  )

  for (const el of qsAll(selector)) {
    observer.observe(el)
  }
}
