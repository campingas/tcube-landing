import { mount } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="container mx-auto px-rhythm-3 py-rhythm-13 border-t border-wada-slate/40" data-reveal>
    
    <!-- Section Title -->
    <div class="text-center mb-rhythm-13">
      <span class="text-wada-teal text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Ages 2 to 14</span>
      <h2 class="font-display text-display-h2 text-wada-paper font-bold leading-tight">
        A device that grows with them.
      </h2>
      <p class="text-wada-paper/85 text-lead font-body max-w-2xl mx-auto mt-rhythm-3">
        T-Cube starts with short English sentences, becomes a language companion, and later opens into a maker project.
      </p>
    </div>
    
    <!-- Milestone Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-rhythm-5">
      
      <!-- Ages 2-5 Card -->
      <div class="bg-gradient-to-b from-wada-slate to-wada-ink/20 p-rhythm-3 rounded-2xl border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
        <div>
          <!-- Visual Placeholder -->
          <div class="w-full h-size-block rounded-xl bg-wada-ink/40 border border-wada-moss/10 flex items-center justify-center mb-rhythm-5 relative overflow-hidden">
            <span class="absolute inset-0 bg-radial-gradient from-wada-rufous/5 to-transparent"></span>
            <!-- Tactile Buttons Representation -->
            <div class="grid grid-cols-2 gap-2 relative">
              <div class="w-rhythm-5 h-rhythm-5 rounded-full bg-wada-salmon/20 border border-wada-salmon/40 group-hover:bg-wada-salmon/40 transition-colors"></div>
              <div class="w-rhythm-5 h-rhythm-5 rounded-full bg-wada-teal/20 border border-wada-teal/40 group-hover:bg-wada-teal/40 transition-colors"></div>
            </div>
          </div>
          
          <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Toddlers (Ages 2–5)</span>
          <h3 class="text-wada-paper text-lead font-semibold font-display mb-rhythm-2">First Screen-Free Companion</h3>
          <p class="text-wada-paper/85 text-body font-body">
            A soft, rounded box with simple buttons. One press plays a short sentence or recording. No feed, no swipe, no blue light.
          </p>
        </div>
        <div class="mt-rhythm-5 pt-rhythm-3 border-t border-wada-moss/10 text-wada-teal text-caption font-mono uppercase tracking-wider flex justify-between items-center">
          <span>Focus: Tactile & Calm</span>
          <span>100% Screen-Free</span>
        </div>
      </div>
      
      <!-- Ages 5-10 Card -->
      <div class="bg-gradient-to-b from-wada-slate to-wada-ink/20 p-rhythm-3 rounded-2xl border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
        <div>
          <!-- Visual Placeholder -->
          <div class="w-full h-size-block rounded-xl bg-wada-ink/40 border border-wada-moss/10 flex items-center justify-center mb-rhythm-5 relative overflow-hidden">
            <!-- Simulated Sound Waves -->
            <div class="flex gap-1.5 items-center">
              <span class="w-1 h-3 bg-wada-teal/40 group-hover:h-8 transition-all duration-300 rounded"></span>
              <span class="w-1 h-6 bg-wada-teal/60 group-hover:h-4 transition-all duration-300 rounded"></span>
              <span class="w-1 h-2 bg-wada-teal/30 group-hover:h-6 transition-all duration-300 rounded"></span>
              <span class="w-1 h-8 bg-wada-teal group-hover:h-3 transition-all duration-300 rounded"></span>
              <span class="w-1 h-4 bg-wada-teal/50 group-hover:h-9 transition-all duration-300 rounded"></span>
            </div>
          </div>
          
          <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Kids (Ages 5–10)</span>
          <h3 class="text-wada-paper text-lead font-semibold font-display mb-rhythm-2">Bilingual Language Partner</h3>
          <p class="text-wada-paper/85 text-body font-body">
            Children hear words again and again until they stick. T-Cube starts with English, then adds European and Asian sentence packs for natural practice.
          </p>
        </div>
        <div class="mt-rhythm-5 pt-rhythm-3 border-t border-wada-moss/10 text-wada-teal text-caption font-mono uppercase tracking-wider flex justify-between items-center">
          <span>Focus: Language & Rhythm</span>
          <span>Bilingual Library</span>
        </div>
      </div>
      
      <!-- Ages 10-14 Card -->
      <div class="bg-gradient-to-b from-wada-slate to-wada-ink/20 p-rhythm-3 rounded-2xl border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
        <div>
          <!-- Visual Placeholder -->
          <div class="w-full h-size-block rounded-xl bg-wada-ink/40 border border-wada-moss/10 flex items-center justify-center mb-rhythm-5 relative p-rhythm-2 font-mono overflow-hidden">
            <!-- Simulated Code Console -->
            <div class="text-[9px] text-wada-teal/70 w-full text-left leading-normal">
              <span class="text-wada-salmon">const</span> tcube = <span class="text-wada-paper">open</span>(<span class="text-wada-teal">"tcube"</span>)
              <br>tcube.on(<span class="text-wada-teal">"button_press"</span>, (btn) => {
              <br>&nbsp;&nbsp;tcube.speak(<span class="text-wada-teal">"Hello, family."</span>)
              <br>})
            </div>
          </div>
          
          <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Tweens & Makers (Ages 10–14)</span>
          <h3 class="text-wada-paper text-lead font-semibold font-display mb-rhythm-2">First Maker Project</h3>
          <p class="text-wada-paper/85 text-body font-body">
            Older children can open the case, change the software, and learn how the device works. It becomes an object they can own and understand.
          </p>
        </div>
        <div class="mt-rhythm-5 pt-rhythm-3 border-t border-wada-moss/10 text-wada-teal text-caption font-mono uppercase tracking-wider flex justify-between items-center">
          <span>Focus: Explore & Build</span>
          <span>Open to Modify</span>
        </div>
      </div>
      
    </div>
  </div>
`

export function initFeatures(): void {
  mount('features', html)
  revealOnScroll('#features [data-reveal]')
}
