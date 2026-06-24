import { mount, qs, qsAll } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="container mx-auto px-rhythm-3 py-rhythm-13 lg:py-rhythm-21" data-reveal>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-rhythm-8 items-center">
      
      <!-- Text Copy Column (7 cols on large screens) -->
      <div class="lg:col-span-7 flex flex-col items-start text-left">
        <div class="inline-flex items-center gap-rhythm-2 px-rhythm-3 py-1.5 rounded-full border border-wada-teal/30 bg-wada-slate text-wada-teal text-caption font-mono uppercase tracking-wider mb-rhythm-5">
          <span class="w-2 h-2 rounded-full bg-wada-teal animate-pulse-slow"></span>
          <span>Open Source Educational Hardware</span>
        </div>
        
        <h1 class="font-display text-display-hero text-wada-paper font-bold leading-none mb-rhythm-3">
          Học bằng cách nghe.<br>
          <span class="text-wada-teal">Learn by listening.</span>
        </h1>
        
        <p class="text-lead text-wada-paper/95 font-body max-w-2xl mb-rhythm-5">
          T-Cube is a screen-free, tactile learning device that reads stories and lessons aloud to children. Gently guiding language acquisition through physical touch and pure listening.
        </p>
        
        <p class="text-body text-wada-moss font-body max-w-xl mb-rhythm-8">
          Designed for bilingual families, international students, and curious makers. Starts with Vietnamese and English, running entirely on open local hardware.
        </p>
        
        <div class="flex flex-wrap gap-rhythm-3 w-full sm:w-auto">
          <a href="#cta" class="w-full sm:w-auto text-center px-rhythm-5 py-rhythm-2 bg-wada-rufous text-wada-paper rounded-md font-semibold text-body hover:bg-wada-teal transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-wada-rufous/10 hover:shadow-wada-teal/10 focus:ring-2 focus:ring-wada-teal focus:outline-none">
            Get T-Cube / Nhận thiết bị
          </a>
          <a href="#hardware" class="w-full sm:w-auto text-center px-rhythm-5 py-rhythm-2 bg-wada-slate border border-wada-moss/30 text-wada-paper rounded-md font-semibold text-body hover:border-wada-teal hover:text-wada-teal transition-all duration-300 focus:ring-2 focus:ring-wada-teal focus:outline-none">
            Build Guide / Hướng dẫn tự ráp
          </a>
        </div>
      </div>
      
      <!-- Interactive Device Simulator Column (5 cols on large screens) -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center relative">
        <!-- Floating Speech Bubble -->
        <div id="simulator-bubble" class="absolute -top-rhythm-8 bg-wada-slate border border-wada-teal/30 p-rhythm-2 rounded-xl shadow-xl max-w-xs transition-all duration-300 transform scale-95 opacity-0 z-10 pointer-events-none">
          <p class="text-caption font-mono text-wada-teal mb-0.5 uppercase tracking-widest">T-Cube says:</p>
          <p id="simulator-bubble-text" class="text-body font-display text-wada-paper font-medium"></p>
        </div>

        <!-- The Physical T-Cube Mockup Enclosure -->
        <div class="w-size-god h-size-god rounded-3xl bg-gradient-to-br from-wada-slate to-wada-ink border-2 border-wada-salmon/40 shadow-2xl p-rhythm-3 flex flex-col justify-between items-center relative select-none">
          
          <!-- Outer details: status LED & branding -->
          <div class="w-full flex justify-between items-center px-rhythm-1">
            <span class="font-display font-bold text-caption text-wada-salmon/60 uppercase tracking-widest">T-Cube Core</span>
            <!-- Glowing LED -->
            <div class="flex items-center gap-rhythm-1">
              <span id="simulator-led-text" class="text-caption font-mono text-wada-moss text-[8px] uppercase">Standby</span>
              <span id="simulator-led" class="w-2.5 h-2.5 rounded-full bg-wada-moss shadow-md transition-all duration-500"></span>
            </div>
          </div>
          
          <!-- Speaker Grill and Audio Visualizer Wave -->
          <div class="w-full flex flex-col items-center justify-center my-rhythm-2 gap-rhythm-1">
            <!-- Simulated circular grill -->
            <div class="relative w-size-block h-size-block rounded-full bg-wada-ink/50 border border-wada-moss/10 flex items-center justify-center">
              <div class="absolute inset-2 rounded-full border border-dashed border-wada-moss/20"></div>
              <div class="absolute inset-5 rounded-full border border-dotted border-wada-moss/30"></div>
              
              <!-- Speaker Center audio wave visualizer -->
              <div id="simulator-visualizer" class="flex gap-1 items-end h-8 overflow-hidden pointer-events-none opacity-40 transition-opacity duration-300">
                <span class="w-1 bg-wada-teal rounded-full bar-anim-1"></span>
                <span class="w-1 bg-wada-teal rounded-full bar-anim-2"></span>
                <span class="w-1 bg-wada-teal rounded-full bar-anim-3"></span>
                <span class="w-1 bg-wada-teal rounded-full bar-anim-4"></span>
                <span class="w-1 bg-wada-teal rounded-full bar-anim-5"></span>
              </div>
            </div>
          </div>
          
          <!-- Interactive Button Matrix -->
          <div class="w-full">
            <p class="text-center text-caption font-mono text-wada-moss mb-rhythm-2 uppercase tracking-wide">
              Press any button to play sound
            </p>
            <div class="grid grid-cols-3 gap-rhythm-2 max-w-[240px] mx-auto">
              <button data-voice="intro" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">👋</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Hello</span>
              </button>
              <button data-voice="story_vi" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">📖</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Truyện</span>
              </button>
              <button data-voice="song" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">🎵</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Nhạc</span>
              </button>
              
              <button data-voice="lesson_en" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">🔤</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Lesson</span>
              </button>
              <button data-voice="quiz" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">❓</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Đố vui</span>
              </button>
              <button data-voice="poem" class="sim-btn aspect-square rounded-lg bg-wada-ink border border-wada-moss/30 hover:border-wada-teal hover:text-wada-teal text-wada-paper font-display font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-1 focus:ring-wada-teal focus:outline-none flex flex-col justify-center items-center p-1">
                <span class="text-lead">🌸</span>
                <span class="text-[8px] font-mono uppercase tracking-widest text-wada-moss">Thơ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
`

// Voice simulator database
const voiceLines: Record<string, { text: string; label: string; ledColor: string }> = {
  intro: {
    text: '"Xin chào! Mình là T-Cube. Rất vui được học cùng bạn! / Hello! I am T-Cube. Nice to listen with you!"',
    label: 'Talking',
    ledColor: 'bg-wada-teal',
  },
  story_vi: {
    text: '"Ngày xửa ngày xưa, ở một ngôi làng nhỏ ven sông..." (Vietnamese Folk Tale)',
    label: 'Story Mode',
    ledColor: 'bg-wada-rufous',
  },
  song: {
    text: '"Kìa con bướm vàng, kìa con bướm vàng, xòe đôi cánh..." (Nursery Rhyme)',
    label: 'Playing Song',
    ledColor: 'bg-wada-teal',
  },
  lesson_en: {
    text: '"Today we will learn the word: F-A-M-I-L-Y. Family means gia đình."',
    label: 'English Lesson',
    ledColor: 'bg-wada-salmon',
  },
  quiz: {
    text: '"Đố bạn quả gì có gai màu đỏ, bên trong hạt đen ngọt lịm? Đúng rồi, là quả thanh long!"',
    label: 'Interactive Quiz',
    ledColor: 'bg-wada-rufous',
  },
  poem: {
    text: '"Hạt gạo làng ta / Có vị phù sa / Của sông Kinh Thầy..."',
    label: 'Poem Mode',
    ledColor: 'bg-wada-teal',
  },
}

let activeTimeout: number | undefined

export function initHero(): void {
  mount('hero', html)
  revealOnScroll('#hero [data-reveal]')

  const buttons = qsAll<HTMLButtonElement>('.sim-btn', qs('#hero'))
  const bubble = qs<HTMLElement>('#simulator-bubble')
  const bubbleText = qs<HTMLElement>('#simulator-bubble-text')
  const led = qs<HTMLElement>('#simulator-led')
  const ledText = qs<HTMLElement>('#simulator-led-text')
  const visualizer = qs<HTMLElement>('#simulator-visualizer')

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const voiceKey = btn.getAttribute('data-voice') ?? ''
      const voice = voiceLines[voiceKey]

      if (voice !== undefined) {
        // Clear active timer
        if (activeTimeout !== undefined) {
          clearTimeout(activeTimeout)
        }

        // Apply interactive states
        bubbleText.textContent = voice.text
        bubble.classList.remove('opacity-0', 'scale-95')
        bubble.classList.add('opacity-100', 'scale-100')

        // LED color & status text
        led.className = `w-2.5 h-2.5 rounded-full shadow-md transition-all duration-300 ${voice.ledColor} animate-pulse`
        ledText.textContent = voice.label

        // Visualizer wave start
        visualizer.classList.remove('opacity-40')
        visualizer.classList.add('opacity-100')
        // Animate the children bars
        const bars = Array.from(visualizer.children) as HTMLElement[]
        bars.forEach((bar) => {
          bar.style.animation = 'pulse 0.5s infinite alternate'
          bar.style.animationDelay = `${(Math.random() * 300).toFixed(0)}ms`
        })

        // Auto clean up after 5 seconds
        activeTimeout = window.setTimeout(() => {
          bubble.classList.add('opacity-0', 'scale-95')
          bubble.classList.remove('opacity-100', 'scale-100')
          led.className =
            'w-2.5 h-2.5 rounded-full bg-wada-moss shadow-md transition-all duration-500'
          ledText.textContent = 'Standby'
          visualizer.classList.add('opacity-40')
          visualizer.classList.remove('opacity-100')
          bars.forEach((bar) => {
            bar.style.animation = ''
          })
        }, 5000)
      }
    })
  })
}
