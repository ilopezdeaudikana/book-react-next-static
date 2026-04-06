'use client'

import { Header } from '@repo/ui'
import { navigateTo } from '@repo/utils'

import { NavListener } from './nav-listener'

export const Menu = () => {
  return (
    <>
      <NavListener />
      <Header onNavigate={(path: string) => navigateTo(path)} />
    </>)
}