'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface BackPatchContext {
  backPath: string,
  setBackPath: Dispatch<SetStateAction<string>>
}

const BackPath = createContext({
  backPath: '/',
  setBackPath: (path: string) => {}
})

export const useBackPath = (): BackPatchContext => {
  const backPath = useContext(BackPath)
  return backPath
}

export const BackPathProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [backPath, setBackPath] = useState<string>('')

  return <BackPath value={{ backPath, setBackPath }}>{children}</BackPath>
}