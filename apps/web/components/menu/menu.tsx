'use client'

import { Header, navigateTo } from '@repo/ui'
import { NavListener } from './nav-listener'

export const Menu = () => {
  return (
    <>
      <NavListener />
      <Header onNavigate={(path: string) => navigateTo(path)} />
    </>)
}