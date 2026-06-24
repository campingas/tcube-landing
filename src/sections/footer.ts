import { mount } from '@/utils/dom'

const html = /* html */ `
  <div class="bg-wada-slate/50 border-t border-wada-slate py-rhythm-8 mt-rhythm-13 select-none">
    <div class="container mx-auto px-rhythm-3 flex flex-col md:flex-row justify-between items-center gap-rhythm-3">
      <!-- Left side: copyright -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left gap-rhythm-1">
        <span class="font-display font-bold text-wada-paper text-body">T-Cube Project</span>
        <span class="text-caption text-wada-moss font-body">© 2026 T-Cube. Open educational hardware and software ecosystem.</span>
      </div>
      
      <!-- Right side: details and links -->
      <div class="flex flex-col items-center md:items-end text-center md:text-right gap-rhythm-1">
        <span class="text-caption text-wada-moss font-mono uppercase tracking-wider">
          Licensed under MIT &amp; CERN-OHL v2
        </span>
        <a href="#" class="text-caption text-wada-teal hover:underline font-mono uppercase tracking-wider">
          Back to Top / Về đầu trang
        </a>
      </div>
    </div>
  </div>
`

export function initFooter(): void {
  mount('site-footer', html)
}
