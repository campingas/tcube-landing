export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'tcube_theme'
export const THEME_CHANGE_EVENT = 'tcube:theme-change'

const media = window.matchMedia('(prefers-color-scheme: dark)')

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function storedTheme(): Theme | null {
  const value = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(value) ? value : null
}

export function currentTheme(): Theme {
  const value = document.documentElement.dataset.theme ?? null
  if (isTheme(value)) {
    return value
  }

  return media.matches ? 'dark' : 'light'
}

function resolvedTheme(): Theme {
  return storedTheme() ?? (media.matches ? 'dark' : 'light')
}

function updateButton(button: HTMLButtonElement, theme: Theme): void {
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = `Use ${next} mode`
  button.dataset.themeToggleState = theme
  button.setAttribute('aria-label', label)
  button.setAttribute('aria-pressed', String(theme === 'dark'))
  button.title = label
}

export function applyTheme(theme: Theme, persist: boolean): void {
  if (persist) {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  window.dispatchEvent(
    new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }),
  )
}

export function initThemeToggle(button: HTMLButtonElement): void {
  applyTheme(resolvedTheme(), false)
  updateButton(button, currentTheme())

  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    applyTheme(next, true)
    updateButton(button, next)
  })

  window.addEventListener(THEME_CHANGE_EVENT, (event) => {
    const detail: unknown = event instanceof CustomEvent ? event.detail : null
    if (typeof detail === 'string' && isTheme(detail)) {
      updateButton(button, detail)
    }
  })

  media.addEventListener('change', () => {
    if (storedTheme() === null) {
      applyTheme(resolvedTheme(), false)
    }
  })
}
