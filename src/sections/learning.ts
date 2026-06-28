import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="site-container" data-reveal>
    <span class="section-label">The learning layer</span>
    <h2 id="learning-title" class="section-headline">Simple device.<br />Optional intelligence.</h2>
    <p class="section-intro">
      T-Cube works out of the box with no AI at all — press a button, hear a sound. When you are
      ready, install two models on your home Mac and the cube gets a tutor. No cloud. No account.
      No data leaves your home.
    </p>

    <div class="modes-grid">
      <div class="mode-card">
        <div class="mode-icon" aria-hidden="true">🔊</div>
        <span class="mode-tag">Available now</span>
        <h3>Listen mode</h3>
        <p>
          Press a button, hear a sound. Works for any age, any language, any content a parent
          uploads, records, or generates with AI. No LLM required. The cube is already useful on day
          one.
        </p>
      </div>
      <div class="mode-card">
        <div class="mode-icon" aria-hidden="true">🎙</div>
        <span class="mode-tag">Coming — v2</span>
        <h3>Repeat-after-me</h3>
        <p>
          The cube plays a lion's roar. Then it says the word. Then it waits. The child names it
          aloud. The LLM listens, adjusts what comes next. Requires a mic on the cube (next hardware
          revision) and a Mac LLM.
        </p>
      </div>
      <div class="mode-card">
        <div class="mode-icon" aria-hidden="true">📚</div>
        <span class="mode-tag">Ages 8+</span>
        <h3>Teacher mode</h3>
        <p>
          The LLM knows the child's age, grade, and language goals — set in a plain text file the
          family controls. It reviews lessons, records the child explaining a concept back, and
          guides improvement. All on your Mac, never in the cloud.
        </p>
      </div>
    </div>

    <div class="loop-row">
      <div class="loop-step">
        <div class="loop-step-label">Content grows</div>
        <div class="loop-step-text">Parent uploads, records, or generates new sounds</div>
      </div>
      <div class="loop-arrow">→</div>
      <div class="loop-step">
        <div class="loop-step-label">Trigger review</div>
        <div class="loop-step-text">Parent or child asks the LLM to re-curate</div>
      </div>
      <div class="loop-arrow">→</div>
      <div class="loop-step">
        <div class="loop-step-label">LLM curates</div>
        <div class="loop-step-text">
          Reads <code>learning.md</code>, applies spacing and difficulty
        </div>
      </div>
      <div class="loop-arrow">→</div>
      <div class="loop-step">
        <div class="loop-step-label">Cube updated</div>
        <div class="loop-step-text">New playlist pushed to the Pi. Cube just plays.</div>
      </div>
    </div>
    <p class="loop-note">The cube does not know any of this happened.</p>
  </div>
`

export function initLearning(): void {
  mount('learning', html)
  document
    .getElementById('learning')
    ?.classList.add('page-section', 'learning-section')
  revealOnScroll('#learning [data-reveal]')
}
