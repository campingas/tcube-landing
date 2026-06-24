/**
 * Basic accessibility utilities
 */

/**
 * Checks if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Ensures focus goes to target element and handles clean cleanup of temporary tabindex
 */
export function focusElement(element: HTMLElement): void {
  const prevTabIndex = element.getAttribute('tabindex')
  if (prevTabIndex === null) {
    element.setAttribute('tabindex', '-1')
  }
  element.focus()
  if (prevTabIndex === null) {
    element.addEventListener(
      'blur',
      () => {
        element.removeAttribute('tabindex')
      },
      { once: true },
    )
  }
}
