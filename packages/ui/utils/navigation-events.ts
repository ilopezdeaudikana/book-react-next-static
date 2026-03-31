import { url } from './url'

export const NAV_EVENT = 'mfe-navigation'

export interface NavEvent {
  path: string
}

export const navigateTo = (path: string, isReactZone?: boolean) => {
  if (isReactZone) {
    window.location.href = `${url}/${path}`
  } else {
    const event = new CustomEvent<NavEvent>(NAV_EVENT, { detail: { path } })
    window.dispatchEvent(event)
  }
}