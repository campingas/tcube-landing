import '@/styles/base.css'
import '@/styles/animations.css'

import { initHeader } from '@/sections/header'
import { initHero } from '@/sections/hero'
import { initFeatures } from '@/sections/features'
import { initLanguages } from '@/sections/languages'
import { initHardware } from '@/sections/hardware'
import { initCta } from '@/sections/cta'
import { initFooter } from '@/sections/footer'

document.addEventListener('DOMContentLoaded', () => {
  initHeader()
  initHero()
  initFeatures()
  initLanguages()
  initHardware()
  initCta()
  initFooter()
})
