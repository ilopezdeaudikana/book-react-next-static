'use client'

import { Header, navigateTo } from '@repo/ui'

export const Menu = () => {
  return (
    <>
      <Header onNavigate={(path: string) => navigateTo(path, true)} />
    </>
  )
}