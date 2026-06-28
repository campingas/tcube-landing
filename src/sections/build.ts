import { revealOnScroll } from '@/utils/intersection'
import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="site-container" data-reveal>
    <div class="build-grid">
      <div class="build-text">
        <span class="section-label">Open hardware</span>
        <h2 id="build-title">Build one.<br />Or understand<br />what's inside.</h2>
        <p>
          T-Cube is a Raspberry Pi Zero 2W with five RGB buttons, an I2S amplifier, and open-source
          firmware written in Rust. Every component is in the bill of materials. Every line of code
          is on GitHub.
        </p>
        <p>
          For makers: the BOM is open, the build guide is detailed, and the community is active. For
          parents: knowing it's a Pi with open firmware means there is no sealed black box — you can
          audit everything your child's device does.
        </p>
        <p>
          The learning layer runs on a Mac on the same home network. <code>learning.md</code> is the
          LLM's operating document — it ships with sensible defaults and is designed to be edited by
          families.
        </p>
        <div class="build-actions">
          <a href="#build-drawer" class="button-primary" data-build-drawer-trigger>View build guide</a>
          <a href="https://github.com/campingas/tcube-pi" class="button-ghost" target="_blank" rel="noopener noreferrer">View T-Cube code</a>
          <a href="https://github.com/campingas/tcube-pi/releases/latest" class="button-ghost build-firmware-cta" target="_blank" rel="noopener noreferrer">Download latest firmware</a>
        </div>
      </div>

      <div class="bom-card">
        <h3>Core bill of materials</h3>
        <div class="bom-item">
          <span class="bom-name">Raspberry Pi Zero 2W</span>
          <span class="bom-detail">Main compute</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">MKE-M02 RGB buttons × 5</span>
          <span class="bom-detail">Tactile interface</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">MAX98357A</span>
          <span class="bom-detail">I2S amplifier</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">3W speaker</span>
          <span class="bom-detail">Audio output</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">INMP441</span>
          <span class="bom-detail">I2S microphone</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">MPU-6050</span>
          <span class="bom-detail">IMU / orientation</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">3D-printed enclosure</span>
          <span class="bom-detail">Files open-source</span>
        </div>
        <div class="bom-item">
          <span class="bom-name">LiPo + charge board</span>
          <span class="bom-detail">Portable power</span>
        </div>
        <div class="bom-open-badge">✦ &nbsp;Open hardware · Open firmware · Open content</div>
      </div>
    </div>
  </div>
`

export function initBuild(): void {
  mount('build', html)
  document
    .getElementById('build')
    ?.classList.add('page-section', 'build-section')
  revealOnScroll('#build [data-reveal]')
}
