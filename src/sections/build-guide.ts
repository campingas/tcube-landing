import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

const docs = {
  assembly:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/assembly-instructions.md',
  characteristics:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/product-characteristics.md',
  learning:
    'https://github.com/campingas/tcube-landing/blob/main/docs/notes/learning.md',
}

const html = /* html */ `
  <div class="site-container build-guide-shell">
    <div class="build-guide-hero" data-reveal>
      <span class="section-label">Open hardware build</span>
      <h1 id="build-guide-title" class="build-guide-title">Build the cube. Keep the child in control.</h1>
      <p class="build-guide-lead">
        T-Cube starts as a small Raspberry Pi sound object: five tactile buttons, one speaker, local
        audio files, and no account. The learning layer comes later, on the family Mac, when the
        family wants it.
      </p>
      <div class="build-guide-actions">
        <a href="${docs.assembly}" class="button-primary">Read assembly notes →</a>
        <a href="${docs.learning}" class="button-ghost">↗ learning.md</a>
      </div>
    </div>

    <div class="build-guide-grid" data-reveal>
      <article class="guide-panel guide-panel-dark">
        <span class="guide-kicker">What you build</span>
        <h2>A 64 mm tactile cube with five luminous faces.</h2>
        <p>
          The target object is an interactive illuminated sensory cube with soft rounded edges,
          translucent button covers, internal audio, and a blank bottom face for power, stability,
          and sound vents.
        </p>
        <dl class="guide-spec-list">
          <div>
            <dt>Form</dt>
            <dd>64 mm cube, target weight under 180 g</dd>
          </div>
          <div>
            <dt>Frame</dt>
            <dd>High-impact child-safe ABS, final validation pending</dd>
          </div>
          <div>
            <dt>Input</dt>
            <dd>Five tactile illuminated buttons, one per non-bottom face</dd>
          </div>
        </dl>
      </article>

      <article class="guide-panel">
        <span class="guide-kicker">Core parts</span>
        <h2>Start with the working electronics path.</h2>
        <div class="guide-bom">
          <div><span>Raspberry Pi Zero 2W</span><small>Main compute</small></div>
          <div><span>MAX98357A</span><small>I2S amplifier</small></div>
          <div><span>3W 8-ohm speaker</span><small>Audio output</small></div>
          <div><span>MKE-M02 buttons × 5</span><small>Tactile input</small></div>
          <div><span>MicroSD + Raspberry Pi OS Lite</span><small>Local runtime</small></div>
        </div>
        <a href="${docs.characteristics}" class="guide-link">Product characteristics →</a>
      </article>
    </div>

    <div class="guide-steps" data-reveal>
      <span class="section-label">Assembly overview</span>
      <h2 class="section-headline">Six steps before the first sound.</h2>
      <div class="step-list">
        <article>
          <span>01</span>
          <h3>Solder the GPIO header</h3>
          <p>Prepare the Pi Zero 2W with a straight 40-pin header. Never power the Pi while soldering.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Prepare Raspberry Pi OS</h3>
          <p>Flash OS Lite, configure Wi-Fi and SSH, enable I2S audio, then confirm the sound card.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Wire the amplifier</h3>
          <p>Connect VIN, GND, BCLK, LRC, DIN, and SD from the MAX98357A to the Pi header.</p>
        </article>
        <article>
          <span>04</span>
          <h3>Add the speaker</h3>
          <p>Attach the 3W speaker to SPK+ and SPK− after the amplifier wiring is complete.</p>
        </article>
        <article>
          <span>05</span>
          <h3>Connect five buttons</h3>
          <p>Use the 3.3V rail for all button modules. Pi GPIO pins are not 5V tolerant.</p>
        </article>
        <article>
          <span>06</span>
          <h3>Load five sounds</h3>
          <p>Add mono WAV files, install the Python libraries, run the script, then press each button.</p>
        </article>
      </div>
      <a href="${docs.assembly}" class="button-primary">Open the full assembly notes →</a>
    </div>

    <div class="learning-install" data-reveal>
      <div>
        <span class="section-label">Optional learning layer</span>
        <h2 class="section-headline">The cube stays simple. The schedule lives nearby.</h2>
      </div>
      <div class="learning-install-copy">
        <p>
          The first build works without AI: press a button, hear a sound. When the family wants a
          learning system, <code>learning.md</code> becomes the operating document for spacing,
          recall, focus sessions, and content progression.
        </p>
        <p>
          The landing promise remains local and family-controlled. The Mac on the same home network
          can run the models. The cube only receives the next playlist.
        </p>
        <a href="${docs.learning}" class="guide-link">Read learning.md →</a>
      </div>
    </div>

    <div class="guide-warning" data-reveal>
      <strong>Hardware note</strong>
      <p>
        Dimensions, materials, drop resistance, moisture resistance, and child-safety claims are
        design targets until final engineering validation is complete.
      </p>
    </div>
  </div>
`

export function initBuildGuide(): void {
  mount('build-guide', html)
  document
    .getElementById('build-guide')
    ?.classList.add('page-section', 'build-guide-section')
  revealOnScroll('#build-guide [data-reveal]')
}
