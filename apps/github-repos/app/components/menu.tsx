'use client'

import { Header } from '@repo/ui'
import { navigateTo } from '@repo/utils'

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