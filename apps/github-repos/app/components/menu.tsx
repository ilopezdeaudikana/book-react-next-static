'use client'

import { Header, navigateTo } from '@repo/ui'

export const Menu = () => {

  const handleNavigation =  (path: string) => {
   console.log('HANDLER', path,)
   navigateTo(path, true)
  }
  
  return (
    <>
      <Header onNavigate={handleNavigation} />
    </>
  )
}