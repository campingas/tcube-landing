import { mount } from '@/utils/dom'

const html = /* html */ `
  <nav class="container mx-auto px-rhythm-3 py-rhythm-3 flex items-center justify-between">
    <!-- Logo & Brand Name -->
    <a href="#" class="flex items-center gap-rhythm-2 text-wada-paper hover:text-wada-teal transition-colors focus:ring-1 focus:ring-wada-teal focus:outline-none rounded">
      <!-- 3D wireframe cube SVG -->
      <svg class="w-rhythm-5 h-rhythm-5 text-wada-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
      <span class="font-display font-bold text-lead tracking-tight">T-Cube</span>
    </a>
    
    <!-- Navigation Links -->
    <div class="hidden md:flex items-center gap-rhythm-5">
      <a href="#features" class="text-caption font-mono uppercase tracking-wider text-wada-paper/70 hover:text-wada-paper transition-colors focus:ring-1 focus:ring-wada-teal focus:outline-none rounded">Features</a>
      <a href="#languages" class="text-caption font-mono uppercase tracking-wider text-wada-paper/70 hover:text-wada-paper transition-colors focus:ring-1 focus:ring-wada-teal focus:outline-none rounded">Languages</a>
      <a href="#hardware" class="text-caption font-mono uppercase tracking-wider text-wada-paper/70 hover:text-wada-paper transition-colors focus:ring-1 focus:ring-wada-teal focus:outline-none rounded">Hardware</a>
      <a href="#cta" class="px-rhythm-3 py-1 bg-wada-slate border border-wada-teal text-wada-teal hover:bg-wada-teal hover:text-wada-paper rounded text-caption font-mono uppercase tracking-wider transition-all duration-300 focus:ring-1 focus:ring-wada-teal focus:outline-none">Get Started</a>
    </div>
  </nav>
`

export function initHeader(): void {
  mount('site-header', html)
}
