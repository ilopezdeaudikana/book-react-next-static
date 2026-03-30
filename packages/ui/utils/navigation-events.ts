export const NAV_EVENT = 'mfe-navigation'

export interface NavEvent {
  path: string
}

export const navigateTo = (path: string) => {
  const event = new CustomEvent<NavEvent>(NAV_EVENT, { detail: { path } })
  console.log('dispatched')
  window.dispatchEvent(event)
}