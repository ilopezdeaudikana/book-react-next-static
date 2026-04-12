import type { ReactNode } from 'react'
import styles from './Error-message.module.css'
import { Typography } from '@repo/ui'

interface ErrorMessageProps {
  message?: string
  children?: ReactNode
}
export const ErrorMessage = ({ message, children }: ErrorMessageProps) => {
  return (
    <div className={styles.root}>
     <Typography variant="text">{ message ? message : 'Data could not be loaded or parsed'}</Typography>
      <>
        {children}
      </>
    </div>
  )
}