import { Button as AntButton } from 'antd'
import type { ReactNode } from 'react'

export interface ButtonProps {
  testId?: string, type?: 'submit' | 'reset', children: ReactNode, disabled?: boolean, onClick?: React.MouseEventHandler<HTMLElement> | undefined
}
export const Button = (
  { testId, children, disabled, onClick, type }: ButtonProps
) => {
  return <AntButton
    type='primary' 
    htmlType={type ?? 'button'} 
    style={{ backgroundColor: '#428bca' }}
    data-testid={testId}
    disabled={disabled}
    variant="outlined"
    size="small"
    onClick={onClick}
  >
    {children}
  </AntButton>
}