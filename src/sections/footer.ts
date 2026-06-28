import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="footer-logo">T<span class="logo-dot">·</span>Cube</div>
  <p>Open hardware · Open firmware · Open content</p>
  <p>
    <a href="#">Privacy</a> &nbsp;·&nbsp;
    <a href="https://github.com/campingas/tcube-pi" target="_blank" rel="noopener noreferrer">GitHub</a>
    &nbsp;·&nbsp; <a href="#">Docs</a>
  </p>
`

export function initFooter(): void {
  mount('site-footer', html)
  document.getElementById('site-footer')?.classList.add('site-footer')
}
