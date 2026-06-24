import { mount } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="container mx-auto px-rhythm-3 py-rhythm-13 border-t border-wada-slate/40" data-reveal>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-rhythm-8 items-center">
      
      <!-- Hardware Diagram/Spec Sheet Column (6 cols) -->
      <div class="lg:col-span-6 order-2 lg:order-1 flex justify-center">
        <div class="w-full max-w-lg bg-gradient-to-br from-wada-slate to-wada-ink/50 border-2 border-wada-salmon/20 rounded-2xl p-rhythm-3 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[420px]">
          
          <!-- Grid BG decoration -->
          <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          <!-- Title details -->
          <div class="z-10 flex justify-between items-center pb-rhythm-2 border-b border-wada-moss/20">
            <div>
              <span class="text-wada-salmon font-mono text-[9px] uppercase tracking-wider block">Schematic Specification</span>
              <span class="text-wada-paper font-display font-bold text-body">T-Cube Developer Board</span>
            </div>
            <span class="px-2 py-0.5 rounded bg-wada-teal/10 border border-wada-teal/30 text-wada-teal font-mono text-[8px] uppercase tracking-widest">Rev 1.2-Open</span>
          </div>
          
          <!-- Board representation layout -->
          <div class="z-10 my-rhythm-3 flex-1 flex items-center justify-center relative">
            <div class="w-size-god h-[200px] border border-wada-moss/30 rounded-xl bg-wada-ink/60 flex flex-col justify-between p-rhythm-2 text-[10px] font-mono text-wada-moss leading-relaxed">
              <div class="flex justify-between items-start">
                <span class="text-wada-teal">// RASPBERRY PI ZERO 2W BRAIN</span>
                <span class="text-wada-paper">[GPIO PINS]</span>
              </div>
              <div class="flex flex-col gap-1 border-y border-wada-moss/10 py-2 my-2">
                <div class="flex justify-between">
                  <span>Pin 18 (I2S CLK)</span>
                  <span class="text-wada-salmon">──&gt; DAC BCK</span>
                </div>
                <div class="flex justify-between">
                  <span>Pin 19 (I2S L/R)</span>
                  <span class="text-wada-salmon">──&gt; DAC LRCK</span>
                </div>
                <div class="flex justify-between">
                  <span>Pin 21 (I2S DATA)</span>
                  <span class="text-wada-salmon">──&gt; DAC DIN</span>
                </div>
              </div>
              <div class="flex justify-between items-end text-[9px]">
                <span>Firmware: Rust Core (Yoke v0.4)</span>
                <span class="text-wada-teal">I2S Audio Output Active</span>
              </div>
            </div>
          </div>
          
          <!-- Specifications Footer -->
          <div class="z-10 pt-rhythm-2 border-t border-wada-moss/20 flex justify-between items-center text-[10px] font-mono text-wada-moss">
            <span>DAC: PCM5102 I2S stereo</span>
            <span class="text-wada-paper">Power: 5V micro-USB / Battery</span>
          </div>
        </div>
      </div>
      
      <!-- Text Copy Column (6 cols) -->
      <div class="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
        <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Maker & Hacker Orbit</span>
        <h2 class="font-display text-display-h2 text-wada-teal font-bold mb-rhythm-3">
          100% open hardware.
        </h2>
        <p class="text-wada-paper text-lead mb-rhythm-5 font-body">
          Flash our firmware, print the case, solder the board.
        </p>
        <p class="text-wada-moss text-body font-body mb-rhythm-8">
          T-Cube doesn't hide behind proprietary lockouts. The entire system is built on standard off-the-shelf components. The enclosure design is open-sourced for 3D printing, and the core audio software is easily modifiable. It's a device parents can trust because they can see exactly what's inside.
        </p>
        
        <!-- Component list items -->
        <div class="grid grid-cols-2 gap-rhythm-3 w-full">
          <div class="flex items-center gap-rhythm-2 text-wada-paper font-mono text-caption">
            <span class="w-1.5 h-1.5 rounded-full bg-wada-teal"></span>
            <span>Raspberry Pi Zero 2W</span>
          </div>
          <div class="flex items-center gap-rhythm-2 text-wada-paper font-mono text-caption">
            <span class="w-1.5 h-1.5 rounded-full bg-wada-teal"></span>
            <span>PCM5102 I2S DAC</span>
          </div>
          <div class="flex items-center gap-rhythm-2 text-wada-paper font-mono text-caption">
            <span class="w-1.5 h-1.5 rounded-full bg-wada-teal"></span>
            <span>3W 4Ω Speaker</span>
          </div>
          <div class="flex items-center gap-rhythm-2 text-wada-paper font-mono text-caption">
            <span class="w-1.5 h-1.5 rounded-full bg-wada-teal"></span>
            <span>9x Tactile Buttons</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
`

export function initHardware(): void {
  mount('hardware', html)
  revealOnScroll('#hardware [data-reveal]')
}
