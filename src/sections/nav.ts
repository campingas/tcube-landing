import { mount } from '@/utils/dom'

const html = /* html */ `
  <a href="/" class="nav-logo">T<span class="logo-dot">·</span>Cube</a>
  <ul class="nav-links">
    <li><a href="/#pitch" class="nav-link">For families</a></li>
    <li><a href="/#learning" class="nav-link">How it learns</a></li>
    <li><a href="/build/" class="nav-link nav-cta">Build it</a></li>
  </ul>
`

export function initNav(): void {
  mount('site-nav', html)
  document.getElementById('site-nav')?.classList.add('site-nav')
}
