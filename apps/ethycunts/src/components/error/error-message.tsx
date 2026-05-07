import type { ReactNode } from 'react'
import { Typography } from '@repo/ui'

interface ErrorMessageProps {
  message?: string
  children?: ReactNode
}
export const ErrorMessage = ({ message, children }: ErrorMessageProps) => {
  return (
    <div className="absolute left-[45%] top-[48%]">
     <Typography variant="text">{ message ? message : 'Data could not be loaded or parsed'}</Typography>
      <>
        {children}
      </>
    </div>
  )
}
