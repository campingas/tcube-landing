import { mount } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="container mx-auto px-rhythm-3 py-rhythm-21 border-t border-wada-slate/40" data-reveal>
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-rhythm-8">
      
      <!-- Families CTA Card -->
      <div class="bg-gradient-to-br from-wada-slate to-wada-ink/50 border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 p-rhythm-5 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-size-hero h-size-hero bg-radial-gradient from-wada-teal/5 to-transparent pointer-events-none"></div>
        <div>
          <span class="text-wada-teal text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Ready to listen?</span>
          <h3 class="font-display text-display-h2 text-wada-paper font-bold mb-rhythm-3 leading-tight">
            For Families
          </h3>
          <p class="text-wada-moss text-body font-body mb-rhythm-5">
            Tell us about your family — we'll let you know when T-Cube is ready near you.
          </p>
          
          <form class="space-y-rhythm-3 mb-rhythm-5" id="interest-form" onsubmit="event.preventDefault()">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-rhythm-2">
              <div>
                <label for="family-name" class="block text-caption font-mono text-wada-moss uppercase mb-1.5 tracking-wider">Parent Name</label>
                <input type="text" id="family-name" placeholder="Anh/Chị..." class="w-full bg-wada-ink/80 text-wada-paper border border-wada-moss/30 p-rhythm-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-wada-teal focus:border-transparent text-body font-body placeholder:text-wada-moss/45" required />
              </div>
              <div>
                <label for="family-email" class="block text-caption font-mono text-wada-moss uppercase mb-1.5 tracking-wider">Email Address</label>
                <input type="email" id="family-email" placeholder="name@domain.com" class="w-full bg-wada-ink/80 text-wada-paper border border-wada-moss/30 p-rhythm-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-wada-teal focus:border-transparent text-body font-body placeholder:text-wada-moss/45" required />
              </div>
            </div>
            <button type="submit" class="w-full py-rhythm-2.5 bg-wada-rufous text-wada-paper font-semibold rounded-lg hover:bg-wada-teal transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-wada-rufous/10 hover:shadow-wada-teal/10 focus:ring-2 focus:ring-wada-teal focus:outline-none text-body font-display">
              Notify Me / Đăng ký nhận tin
            </button>
          </form>
        </div>
        <div class="pt-rhythm-3 border-t border-wada-moss/10 flex justify-between items-center text-caption text-wada-moss font-body">
          <span>🔒 Privacy-First by Design</span>
          <span>No third-party trackers</span>
        </div>
      </div>

      <!-- Makers CTA Card -->
      <div class="bg-gradient-to-br from-wada-slate to-wada-ink/50 border border-wada-moss/20 hover:border-wada-teal/40 transition-all duration-300 p-rhythm-5 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-size-hero h-size-hero bg-radial-gradient from-wada-salmon/5 to-transparent pointer-events-none"></div>
        <div>
          <span class="text-wada-salmon text-caption font-mono uppercase tracking-widest block mb-rhythm-2">Want to build?</span>
          <h3 class="font-display text-display-h2 text-wada-paper font-bold mb-rhythm-3 leading-tight">
            For Makers
          </h3>
          <p class="text-wada-moss text-body font-body mb-rhythm-8">
            Build with us — the hardware and software are open. Read our docs and get started.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-rhythm-3">
            <a href="https://github.com/campingas/tcube-landing" target="_blank" rel="noopener noreferrer" class="flex-1 text-center py-rhythm-2.5 bg-wada-slate border border-wada-moss/30 text-wada-paper font-semibold rounded-lg hover:border-wada-teal hover:text-wada-teal transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-wada-teal focus:outline-none text-body font-display">
              GitHub Repo
            </a>
            <a href="/docs" class="flex-1 text-center py-rhythm-2.5 bg-wada-slate border border-wada-moss/30 text-wada-paper font-semibold rounded-lg hover:border-wada-teal hover:text-wada-teal transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-wada-teal focus:outline-none text-body font-display">
              Documentation
            </a>
          </div>
        </div>
        <div class="pt-rhythm-3 border-t border-wada-moss/10 flex justify-between items-center text-caption text-wada-moss font-mono">
          <span>MIT & CERN-OHL Licensed</span>
          <span class="text-wada-teal font-semibold">Join Core Orbit</span>
        </div>
      </div>
      
    </div>
  </div>
`

export function initCta(): void {
  mount('cta', html)
  revealOnScroll('#cta [data-reveal]')
}
