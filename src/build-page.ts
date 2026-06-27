import '@/styles/base.css'

import { initBuildGuide } from '@/sections/build-guide'
import { initFooter } from '@/sections/footer'
import { initNav } from '@/sections/nav'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initBuildGuide()
  initFooter()
})
