import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="site-container" data-reveal>
    <span class="section-label">For families</span>
    <h2 id="pitch-title" class="section-headline">Built to grow with them.</h2>
    <p class="section-intro">
      T-Cube grows alongside your child — from a toddler's first word to a teenager who switches between French, English, and Mandarin without thinking. The device stays the same. What it does changes.
    </p>

    <div class="age-cards">
      <div class="age-card">
        <div class="age-range">Ages 1–5</div>
        <h3>A first sound,<br />a first word.</h3>
        <p>
          She picks up the cube. A button glows. She presses it. A lion roars — then a calm voice
          says <em>lion</em>. She presses it again. And again. No screen. No scroll. No algorithm
          deciding what she hears next. Just her hand, a button, and a sound she chose.
        </p>
      </div>
      <div class="age-card">
        <div class="age-range">Ages 5–10</div>
        <h3>A second language,<br />quietly.</h3>
        <p>
          He is at an international school. French at home, English at school, Mandarin on
          Saturdays. T-Cube does not drill. It plays the right word, in the right language, at the
          right moment — because the system tracks what he has heard and spaces what comes next.
          Language grows the way it is supposed to: through listening, over time.
        </p>
      </div>
      <div class="age-card">
        <div class="age-range">Ages 10–14</div>
        <h3>A study partner<br />that listens back.</h3>
        <p>
          She is reviewing for a history test. The cube cues white noise, sets a focus timer, and
          plays the lesson she recorded herself. An LLM — running on the family Mac, never in the
          cloud — guides her to explain what she got wrong, in her own words. She owns her device.
          She owns her learning.
        </p>
      </div>
    </div>

    <div class="learning-beat">
      <div class="learning-beat-text">
        <h3>The invisible curriculum behind every button press.</h3>
        <p>
          Most language toys play sounds. T-Cube plays sounds in the right order, at the right
          intervals, with the right difficulty gradient. The button sequence a child presses is not
          random — it reflects a curriculum maintained by an LLM that knows this child.
        </p>
        <p>
          The child never sees any of this. They press a glowing button and hear a word they
          almost-but-not-quite know. They press it again tomorrow. Over months, a language grows —
          quietly, one button at a time.
        </p>
      </div>
      <div class="science-pills">
        <div class="science-pill">
          <div class="pill-dot pill-dot-coral"></div>
          <div>
            <strong>Words revisited at the right moment</strong>
            <span>
              The same word appears at day 1, day 3, day 7 — never randomly. Forgetting is slowed
              without the child noticing.
            </span>
          </div>
        </div>
        <div class="science-pill">
          <div class="pill-dot pill-dot-teal"></div>
          <div>
            <strong>Produce before you receive</strong>
            <span>
              The child names a sound before hearing the word confirmed. Recall builds deeper
              retention than re-listening ever does.
            </span>
          </div>
        </div>
        <div class="science-pill">
          <div class="pill-dot pill-dot-amber"></div>
          <div>
            <strong>Always 80% familiar, 20% new</strong>
            <span>
              Content pitched just above the child's current level creates productive challenge —
              not frustration, not boredom.
            </span>
          </div>
        </div>
        <div class="science-pill">
          <div class="pill-dot pill-dot-violet"></div>
          <div>
            <strong>No decisions, no fatigue</strong>
            <span>
              The parent loads the playlist. The child just presses. Removing choice preserves
              energy for the learning itself.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
`

export function initPitch(): void {
  mount('pitch', html)
  document.getElementById('pitch')?.classList.add('page-section')
  revealOnScroll('#pitch [data-reveal]')
}
