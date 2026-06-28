import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="hero-copy" data-reveal>
    <span class="hero-eyebrow">Screen-free &nbsp;·&nbsp; Any language &nbsp;·&nbsp; Any age</span>
    <h1 id="hero-title" class="hero-headline">
      Press a button.<br />
      <em>A word plays</em><br />
      naturally.
    </h1>
    <p class="hero-sub">
      Tomorrow, a harder sequence. One day, a language. Five buttons. Your voice, or any voice, any language. No screen, no feed, no account. That's the whole thing.
    </p>
    <div class="hero-actions">
      <a href="#community" class="button-primary">Vote for the first feature →</a>
      <a href="#build" class="button-ghost">↗ Build one</a>
    </div>
  </div>

  <div class="hero-cube" data-reveal>
    <div
      id="hero-cube-scene"
      class="cube-scene"
      role="img"
      aria-label="A black tactile cube with five glowing buttons, one on each non-bottom face"
    >
      <canvas id="hero-cube-canvas" class="cube-canvas"></canvas>
    </div>
  </div>
`

export function initHero(): void {
  mount('hero', html)
  document.getElementById('hero')?.classList.add('hero-section')
  void import('@/three/hero-cube')
    .then(({ initHeroCube }) => {
      initHeroCube()
    })
    .catch((error: unknown) => {
      console.error('Failed to load hero cube renderer', error)
    })
  revealOnScroll('#hero [data-reveal]')
}
