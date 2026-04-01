'use client'

import { Header, navigateTo } from '@repo/ui'

export const Menu = () => {

  const handleNavigation =  (path: string) => {
    navigateTo(path, true)
  }

  return (
    <>
      <Header onNavigate={handleNavigation} />
    </>
  )
}