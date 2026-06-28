import { mount, qs, qsAll } from '@/utils/dom'

const docs = {
  learning:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/learning.md',
}

const githubLinkAttrs = 'target="_blank" rel="noopener noreferrer"'

const html = /* html */ `
  <div id="llm-drawer" class="build-drawer" data-llm-drawer hidden>
    <button type="button" class="build-drawer-backdrop" data-llm-drawer-close aria-label="Close LLM operators guide"></button>
    <aside
      class="build-drawer-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="llm-drawer-title"
      tabindex="-1"
    >
      <div class="build-drawer-header">
        <span class="section-label">LLM operators</span>
        <button type="button" class="build-drawer-close" data-llm-drawer-close aria-label="Close LLM operators guide">
          ×
        </button>
        <h2 id="llm-drawer-title">Speech, playlists, and learning rhythm.</h2>
        <p>
          The cube stays simple. The LLM layer is the optional operator nearby: it helps turn
          recordings, generated speech, and learning goals into the next useful sounds for the child.
        </p>
      </div>

      <div class="drawer-panel-grid">
        <article class="drawer-info-card drawer-info-card-dark">
          <span class="guide-kicker">Speech</span>
          <h3>Generate voices without moving the child to a screen.</h3>
          <p>
            Parents can record their own voice or generate short sentence packs. The cube only gets
            audio files and a playlist; the model work stays on the family computer.
          </p>
        </article>

        <article class="drawer-info-card">
          <span class="guide-kicker">Learn</span>
          <h3>Keep repetition useful, not random.</h3>
          <p>
            <code>learning.md</code> describes age, languages, goals, pace, and spacing rules. The
            LLM reads it as the operating document before proposing what should play next.
          </p>
        </article>
      </div>

      <div class="drawer-operator-flow">
        <span class="section-label">Operator loop</span>
        <h3>From content to the next playlist.</h3>
        <div class="operator-flow-grid">
          <div>
            <strong>1. Add material</strong>
            <span>Record a parent voice, prepare phrases, or generate speech from text.</span>
          </div>
          <div>
            <strong>2. Review the profile</strong>
            <span>The LLM reads <code>learning.md</code> for level, language balance, and pace.</span>
          </div>
          <div>
            <strong>3. Curate the sequence</strong>
            <span>Sounds are ordered by spacing, recall, and gentle difficulty progression.</span>
          </div>
          <div>
            <strong>4. Sync the cube</strong>
            <span>The Pi receives the next playlist. The child still only presses buttons.</span>
          </div>
        </div>
      </div>

      <div class="drawer-learning-note">
        <span class="section-label">Reference document</span>
        <p>
          Use <code>learning.md</code> as the editable contract between the family and the model. It
          should stay specific, local, and understandable by a parent.
        </p>
        <a href="${docs.learning}" class="guide-link" ${githubLinkAttrs}>Read learning.md →</a>
      </div>
    </aside>
  </div>
`

export function initLlmDrawer(): void {
  mount('llm-drawer-root', html)

  const drawer = qs<HTMLElement>('[data-llm-drawer]')
  const panel = qs<HTMLElement>('.build-drawer-panel', drawer)
  const triggers = qsAll<HTMLElement>('[data-llm-drawer-trigger]')
  let previousFocus: HTMLElement | null = null

  const setTriggerState = (expanded: boolean): void => {
    for (const trigger of triggers) {
      trigger.setAttribute('aria-controls', 'llm-drawer')
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

  for (const close of qsAll<HTMLButtonElement>('[data-llm-drawer-close]')) {
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
