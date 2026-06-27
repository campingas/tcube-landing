import { qs, qsAll } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

type PollChoice = 'play' | 'assistant'

interface PollCounts {
  assistant: number
  play: number
}

const VOTE_KEY = 'tcube_feature_vote'
const COUNTS_KEY = 'tcube_feature_vote_counts'
const EXIT_KEY = 'tcube_feature_vote_exit_dismissed'

const initialCounts: PollCounts = {
  assistant: 0,
  play: 0,
}

const html = /* html */ `
  <div class="site-container" data-reveal>
    <span class="section-label">Join the project</span>
    <h2 id="community-title" class="section-headline">
      Vote for what T-Cube should do first.<br />Or build with us.
    </h2>
    <p class="section-intro">One tiny vote. No email needed.</p>

    <div class="community-split">
      <div class="community-card community-card-families">
        <h3>For families</h3>
        <p>
          Which feature would you use first? Your vote helps decide whether T-Cube should lean first
          into playful audio or a structured learning assistant.
        </p>

        <div class="feature-poll" data-poll>
          <div class="poll-options" data-poll-options>
            <button type="button" class="poll-option" data-vote-choice="play">
              <span class="poll-option-kicker">Play first</span>
              <strong>Languages, sounds, and music</strong>
              <span>Short phrases, animal sounds, songs, and voice packs for everyday listening.</span>
            </button>
            <button type="button" class="poll-option" data-vote-choice="assistant">
              <span class="poll-option-kicker">Learn first</span>
              <strong>Learning assistant</strong>
              <span>Spaced practice, recall prompts, focus sessions, and guided progression.</span>
            </button>
          </div>

          <div class="poll-results" data-poll-results hidden>
            <p class="poll-thanks" data-poll-thanks>Thanks. Your vote is counted on this device.</p>
            <div class="poll-result-row">
              <div class="poll-result-label">
                <span>Play languages, sounds, and music</span>
                <strong data-result-percent="play">0%</strong>
              </div>
              <div class="poll-result-track"><span data-result-bar="play"></span></div>
            </div>
            <div class="poll-result-row">
              <div class="poll-result-label">
                <span>Learning assistant</span>
                <strong data-result-percent="assistant">0%</strong>
              </div>
              <div class="poll-result-track"><span data-result-bar="assistant"></span></div>
            </div>
            <p class="poll-note">Local browser result for now. No contact details collected.</p>
          </div>
        </div>
      </div>

      <div class="community-card community-card-makers">
        <h3>For makers &amp; contributors</h3>
        <p>
          The hardware is real. The software is open. The community is small and serious. Come with
          a question, a pull request, or a fork — all welcome.
        </p>
        <div class="maker-links">
          <a href="#" class="maker-link">
            <div class="maker-link-icon" aria-hidden="true">⌥</div>
            <span class="maker-link-label">GitHub — hardware &amp; firmware</span>
            <span class="maker-link-arrow">→</span>
          </a>
          <a href="/build/" class="maker-link">
            <div class="maker-link-icon" aria-hidden="true">📐</div>
            <span class="maker-link-label">Build guide &amp; full documentation</span>
            <span class="maker-link-arrow">→</span>
          </a>
          <a href="#" class="maker-link">
            <div class="maker-link-icon" aria-hidden="true">💬</div>
            <span class="maker-link-label">Community forum &amp; Discord</span>
            <span class="maker-link-arrow">→</span>
          </a>
          <a href="#" class="maker-link">
            <div class="maker-link-icon" aria-hidden="true">📄</div>
            <span class="maker-link-label">learning.md — LLM operating document</span>
            <span class="maker-link-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="exit-vote" data-exit-vote hidden>
    <div class="exit-vote-card" role="dialog" aria-modal="false" aria-labelledby="exit-vote-title">
      <button type="button" class="exit-vote-close" data-exit-close aria-label="Dismiss feature vote">
        ×
      </button>
      <span class="exit-vote-badge">Tiny vote</span>
      <h3 id="exit-vote-title">Don't go before telling us this.</h3>
      <p>Which T-Cube feature would you use first?</p>
      <div class="exit-vote-actions">
        <button type="button" class="exit-vote-choice" data-vote-choice="play">
          Play sounds
        </button>
        <button type="button" class="exit-vote-choice" data-vote-choice="assistant">
          Learning assistant
        </button>
      </div>
    </div>
  </div>
`

function isPollChoice(value: string | null): value is PollChoice {
  return value === 'play' || value === 'assistant'
}

function parseCounts(value: string | null): PollCounts {
  if (value === null) {
    return { ...initialCounts }
  }

  try {
    const parsed: unknown = JSON.parse(value)

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'play' in parsed &&
      'assistant' in parsed
    ) {
      const play = Reflect.get(parsed, 'play')
      const assistant = Reflect.get(parsed, 'assistant')

      if (typeof play === 'number' && typeof assistant === 'number') {
        return {
          assistant: Math.max(0, assistant),
          play: Math.max(0, play),
        }
      }
    }
  } catch {
    return { ...initialCounts }
  }

  return { ...initialCounts }
}

function getCounts(): PollCounts {
  return parseCounts(window.localStorage.getItem(COUNTS_KEY))
}

function saveCounts(counts: PollCounts): void {
  window.localStorage.setItem(COUNTS_KEY, JSON.stringify(counts))
}

function getVote(): PollChoice | null {
  const vote = window.localStorage.getItem(VOTE_KEY)
  return isPollChoice(vote) ? vote : null
}

function setResultBar(choice: PollChoice, percent: number): void {
  qs<HTMLElement>(`[data-result-percent="${choice}"]`).textContent =
    `${String(percent)}%`
  qs<HTMLElement>(`[data-result-bar="${choice}"]`).style.width =
    `${String(percent)}%`
}

function renderResults(selected: PollChoice | null): void {
  const counts = getCounts()
  const total = counts.play + counts.assistant
  const playPercent = total === 0 ? 0 : Math.round((counts.play / total) * 100)
  const assistantPercent = total === 0 ? 0 : 100 - playPercent

  setResultBar('play', playPercent)
  setResultBar('assistant', assistantPercent)

  if (selected !== null) {
    qs<HTMLElement>('[data-poll-options]').hidden = true
    qs<HTMLElement>('[data-poll-results]').hidden = false

    const label =
      selected === 'play'
        ? 'languages, sounds, and music'
        : 'the learning assistant'
    qs<HTMLElement>('[data-poll-thanks]').textContent =
      `Thanks. You chose ${label}.`
  }
}

function closeExitVote(): void {
  const exitVote = qs<HTMLElement>('[data-exit-vote]')
  exitVote.hidden = true
}

function submitVote(choice: PollChoice): void {
  if (getVote() !== null) {
    closeExitVote()
    return
  }

  const counts = getCounts()
  counts[choice] += 1
  saveCounts(counts)
  window.localStorage.setItem(VOTE_KEY, choice)
  window.localStorage.setItem(EXIT_KEY, 'true')
  renderResults(choice)
  closeExitVote()
}

function bindPoll(): void {
  for (const button of qsAll<HTMLButtonElement>('[data-vote-choice]')) {
    button.addEventListener('click', () => {
      const choice = button.dataset.voteChoice ?? null

      if (isPollChoice(choice)) {
        submitVote(choice)
      }
    })
  }

  const existingVote = getVote()
  renderResults(existingVote)
}

function bindExitVote(): void {
  let exitVoteArmed = false

  const dismissExitVote = (): void => {
    window.localStorage.setItem(EXIT_KEY, 'true')
    closeExitVote()
  }

  const closeButton = qs<HTMLButtonElement>('[data-exit-close]')
  closeButton.addEventListener('click', dismissExitVote)
  closeButton.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    dismissExitVote()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return
    }

    const exitVote = qs<HTMLElement>('[data-exit-vote]')
    if (!exitVote.hidden) {
      dismissExitVote()
    }
  })

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.clientY > 12) {
        exitVoteArmed = true
      }
    },
    { passive: true },
  )

  document.addEventListener('mouseleave', (event) => {
    if (
      !exitVoteArmed ||
      event.clientY > 0 ||
      getVote() !== null ||
      window.localStorage.getItem(EXIT_KEY) === 'true'
    ) {
      return
    }

    qs<HTMLElement>('[data-exit-vote]').hidden = false
  })
}

export function initCommunity(): void {
  mount('community', html)
  document.getElementById('community')?.classList.add('page-section')
  bindPoll()
  bindExitVote()
  revealOnScroll('#community [data-reveal]')
}
