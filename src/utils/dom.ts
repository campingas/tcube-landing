export function qs<T extends Element>(selector: string, scope: ParentNode = document): T {
  const el = scope.querySelector<T>(selector)
  if (el === null) {
    throw new Error(`qs: "${selector}" not found`)
  }
  return el
}

export function qsAll<T extends Element>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector))
}

export function mount(id: string, html: string): void {
  qs<HTMLElement>(`#${id}`).innerHTML = html
}
