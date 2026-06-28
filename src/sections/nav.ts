import { initThemeToggle } from '@/theme'
import { mount, qs } from '@/utils/dom'

const html = /* html */ `
  <a href="/" class="nav-logo">T<span class="logo-dot">·</span>Cube</a>
  <div class="nav-actions">
    <ul class="nav-links">
      <li><a href="/#pitch" class="nav-link">For families</a></li>
      <li><a href="/#learning" class="nav-link">How it learns</a></li>
      <li><a href="#build-drawer" class="nav-link nav-cta" data-build-drawer-trigger>Build it</a></li>
    </ul>
    <button class="theme-toggle" type="button" aria-label="Use dark mode" aria-pressed="false">
      <span class="theme-toggle-icon" aria-hidden="true"></span>
    </button>
  </div>
`

export function initNav(): void {
  mount('site-nav', html)
  document.getElementById('site-nav')?.classList.add('site-nav')
  initThemeToggle(qs<HTMLButtonElement>('.theme-toggle'))
}
