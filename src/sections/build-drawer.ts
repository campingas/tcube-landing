import { mount, qs, qsAll } from '@/utils/dom'

const docs = {
  assembly:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/assembly-instructions.md',
  characteristics:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/product-characteristics.md',
  code: 'https://github.com/campingas/tcube-pi',
  firmware: 'https://github.com/campingas/tcube-pi/releases/latest',
}

const githubLinkAttrs = 'target="_blank" rel="noopener noreferrer"'

const html = /* html */ `
  <div id="build-drawer" class="build-drawer" data-build-drawer hidden>
    <button type="button" class="build-drawer-backdrop" data-build-drawer-close aria-label="Close build guide"></button>
    <aside
      class="build-drawer-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="build-drawer-title"
      tabindex="-1"
    >
      <div class="build-drawer-header">
        <span class="section-label">Open hardware build</span>
        <button type="button" class="build-drawer-close" data-build-drawer-close aria-label="Close build guide">
          ×
        </button>
        <h2 id="build-drawer-title">Build the cube. Install the release.</h2>
        <p>
          The short path for makers and technically curious families: understand the hardware,
          download the firmware, then follow the full assembly notes when you are ready.
        </p>
      </div>

      <div class="build-drawer-actions">
        <a href="${docs.assembly}" class="button-primary" ${githubLinkAttrs}>Read assembly notes</a>
        <a href="${docs.code}" class="button-ghost" ${githubLinkAttrs}>View T-Cube code</a>
        <a href="${docs.firmware}" class="drawer-firmware-link" ${githubLinkAttrs}>
          <span aria-hidden="true">↓</span>
          <strong>Download latest firmware</strong>
          <small>github.com/campingas/tcube-pi/releases/latest</small>
        </a>
      </div>

      <div class="drawer-panel-grid">
        <article class="drawer-info-card drawer-info-card-dark">
          <span class="guide-kicker">What you build</span>
          <h3>A 64 mm tactile cube with five luminous faces.</h3>
          <p>
            A small Raspberry Pi sound object with five tactile illuminated buttons, one speaker,
            local audio files, and a blank bottom face for power, stability, and sound vents.
          </p>
          <dl>
            <div>
              <dt>Form</dt>
              <dd>64 mm cube, target weight under 180 g</dd>
            </div>
            <div>
              <dt>Input</dt>
              <dd>Five buttons, one per non-bottom face</dd>
            </div>
          </dl>
        </article>

        <article class="drawer-info-card">
          <span class="guide-kicker">Core parts</span>
          <h3>The working electronics path.</h3>
          <div class="drawer-bom">
            <div><span>Raspberry Pi Zero 2W</span><small>Main compute</small></div>
            <div><span>MAX98357A</span><small>I2S amplifier</small></div>
            <div><span>3W 8-ohm speaker</span><small>Audio output</small></div>
            <div><span>MKE-M02 buttons × 5</span><small>Tactile input</small></div>
            <div><span>MicroSD + Raspberry Pi OS Lite</span><small>Local runtime</small></div>
          </div>
          <a href="${docs.characteristics}" class="guide-link" ${githubLinkAttrs}>Product characteristics →</a>
        </article>
      </div>

      <div class="drawer-steps">
        <span class="section-label">Assembly overview</span>
        <h3>Six steps before the first sound.</h3>
        <ol>
          <li><strong>Solder the GPIO header</strong><span>Prepare the Pi Zero 2W.</span></li>
          <li><strong>Prepare Raspberry Pi OS</strong><span>Flash OS Lite, Wi-Fi, SSH, and I2S.</span></li>
          <li><strong>Wire the amplifier</strong><span>Connect the MAX98357A to the Pi header.</span></li>
          <li><strong>Add the speaker</strong><span>Attach the 3W speaker after wiring.</span></li>
          <li><strong>Connect five buttons</strong><span>Use 3.3V; Pi GPIO is not 5V tolerant.</span></li>
          <li><strong>Load five sounds</strong><span>Add WAV files and test each button.</span></li>
        </ol>
      </div>

    </aside>
  </div>
`

export function initBuildDrawer(): void {
  mount('build-drawer-root', html)

  const drawer = qs<HTMLElement>('[data-build-drawer]')
  const panel = qs<HTMLElement>('.build-drawer-panel', drawer)
  const triggers = qsAll<HTMLElement>('[data-build-drawer-trigger]')
  let previousFocus: HTMLElement | null = null

  const setTriggerState = (expanded: boolean): void => {
    for (const trigger of triggers) {
      trigger.setAttribute('aria-controls', 'build-drawer')
      trigger.setAttribute('aria-expanded', String(expanded))
      trigger.setAttribute('aria-haspopup', 'dialog')
    }
  }

  const getFocusableElements = (): HTMLElement[] =>
    qsAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      panel,
    )

  const openDrawer = (trigger: HTMLElement): void => {
    previousFocus = trigger
    drawer.hidden = false
    document.body.classList.add('has-side-drawer')
    setTriggerState(true)
    panel.focus()
  }

  const closeDrawer = (): void => {
    drawer.hidden = true
    document.body.classList.remove('has-side-drawer')
    setTriggerState(false)
    previousFocus?.focus()
  }

  setTriggerState(false)

  for (const trigger of triggers) {
    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      openDrawer(trigger)
    })
  }

  for (const close of qsAll<HTMLButtonElement>('[data-build-drawer-close]')) {
    close.addEventListener('click', closeDrawer)
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) {
      closeDrawer()
      return
    }

    if (event.key !== 'Tab' || drawer.hidden) {
      return
    }

    const focusableElements = getFocusableElements()
    const first = focusableElements.at(0)
    const last = focusableElements.at(-1)

    if (first === undefined || last === undefined) {
      return
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })
}
