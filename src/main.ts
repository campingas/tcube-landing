import '@/styles/base.css'

import { initBuild } from '@/sections/build'
import { initCommunity } from '@/sections/community'
import { initFooter } from '@/sections/footer'
import { initHero } from '@/sections/hero'
import { initLearning } from '@/sections/learning'
import { initNav } from '@/sections/nav'
import { initPitch } from '@/sections/pitch'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initHero()
  initPitch()
  initLearning()
  initBuild()
  initCommunity()
  initFooter()
})
