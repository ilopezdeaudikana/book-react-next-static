import type { ReactNode } from "react"
import styles from './Error-message.module.css'

interface ErrorMessageProps {
  message?: string
  children?: ReactNode
}
export const ErrorMessage = ({ message, children }: ErrorMessageProps) => {
  return (
    <div className={styles.root}>
      <p>{ message ? message : 'Data could not be loaded or parsed'}</p>
      <>
        {children}
      </>
    </div>
  )
}