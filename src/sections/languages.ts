import { mount } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="container mx-auto px-rhythm-3 py-rhythm-13 border-t border-wada-slate/40" data-reveal>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-rhythm-8 items-center">
      
      <!-- Copy Column (5 cols) -->
      <div class="lg:col-span-5">
        <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Multi-Locale Support</span>
        <h2 class="font-display text-display-h2 text-wada-teal font-bold mb-rhythm-3">
          Voice of the world.
        </h2>
        <p class="text-wada-paper text-lead mb-rhythm-5 font-body">
          We teach children languages the same way they acquired their first: through constant, warm repetition.
        </p>
        <p class="text-wada-moss text-body font-body mb-rhythm-5">
          T-Cube reads stories and interactive guides aloud using high-fidelity local text-to-speech engine models. By prioritizing localized regional contents first, we bridge local heritage with global education.
        </p>
      </div>
      
      <!-- Languages Grid Column (7 cols) -->
      <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-rhythm-3">
        <!-- Vietnamese -->
        <div class="bg-gradient-to-br from-wada-slate to-wada-ink border border-wada-teal/30 hover:border-wada-teal transition-all duration-300 p-rhythm-3 rounded-xl flex flex-col justify-between h-size-tile shadow-lg group">
          <div class="flex justify-between items-start">
            <span class="text-wada-paper font-semibold font-display text-lead">Tiếng Việt</span>
            <span class="inline-block px-2 py-0.5 rounded-full bg-wada-teal/20 text-wada-teal text-[9px] font-mono uppercase tracking-wider">Primary Locale</span>
          </div>
          <p class="text-wada-moss text-caption font-body mt-2 leading-relaxed">
            Designed for native pronunciation. Local children learn spelling and national history tales in their native tongue.
          </p>
        </div>
        
        <!-- English -->
        <div class="bg-gradient-to-br from-wada-slate to-wada-ink border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 p-rhythm-3 rounded-xl flex flex-col justify-between h-size-tile shadow-lg group">
          <div class="flex justify-between items-start">
            <span class="text-wada-paper font-semibold font-display text-lead">English</span>
            <span class="inline-block px-2 py-0.5 rounded-full bg-wada-moss/20 text-wada-moss text-[9px] font-mono uppercase tracking-wider">Acquisition</span>
          </div>
          <p class="text-wada-moss text-caption font-body mt-2 leading-relaxed">
            English learning classes integrated seamlessly with bedtime stories and spelling exercises for young children.
          </p>
        </div>
        
        <!-- French -->
        <div class="bg-gradient-to-br from-wada-slate to-wada-ink border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 p-rhythm-3 rounded-xl flex flex-col justify-between h-size-tile shadow-lg group opacity-60 hover:opacity-100">
          <div class="flex justify-between items-start">
            <span class="text-wada-paper font-semibold font-display text-lead">Français</span>
            <span class="inline-block px-2 py-0.5 rounded-full bg-wada-slate text-wada-moss text-[9px] font-mono uppercase tracking-wider">Future</span>
          </div>
          <p class="text-wada-moss text-caption font-body mt-2 leading-relaxed">
            French-based story libraries and grammatical metrics, planned for the next system version release.
          </p>
        </div>
        
        <!-- Chinese -->
        <div class="bg-gradient-to-br from-wada-slate to-wada-ink border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 p-rhythm-3 rounded-xl flex flex-col justify-between h-size-tile shadow-lg group opacity-60 hover:opacity-100">
          <div class="flex justify-between items-start">
            <span class="text-wada-paper font-semibold font-display text-lead">中文</span>
            <span class="inline-block px-2 py-0.5 rounded-full bg-wada-slate text-wada-moss text-[9px] font-mono uppercase tracking-wider">Future</span>
          </div>
          <p class="text-wada-moss text-caption font-body mt-2 leading-relaxed">
            Standard Chinese phonetic exercises and vocab classes, planned for future international additions.
          </p>
        </div>
      </div>
      
    </div>
  </div>
`

export function initLanguages(): void {
  mount('languages', html)
  revealOnScroll('#languages [data-reveal]')
}
