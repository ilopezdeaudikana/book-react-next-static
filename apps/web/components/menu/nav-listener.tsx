'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { NAV_EVENT } from '@repo/ui'

export const NavListener = () => {
  const router = useRouter()
  const path = usePathname()
  useEffect(() => {
    const handleNav = (event: CustomEvent) => {
      console.log('EVER')
      const targetPath = event.detail.path
      // Prevent redundant navigation
      if (path !== targetPath) {
        router.push(targetPath)
      }
    }

    window.addEventListener(NAV_EVENT, handleNav)
    return () => window.removeEventListener(NAV_EVENT, handleNav)
  }, [router])

  return null
}